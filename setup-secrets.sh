#!/bin/bash

echo "🔐 Configurando secrets del repositorio GitHub..."

# Verificar que gh CLI esté autenticado
if ! gh auth status >/dev/null 2>&1; then
    echo "❌ Error: No estás autenticado con gh CLI"
    echo "Ejecuta: gh auth login"
    exit 1
fi

echo ""
echo "📋 Necesitas configurar estos secrets para el deploy:"
echo ""
echo "🔑 AWS/S3 Secrets (para almacenamiento de imágenes):"
echo "   - BUCKET_NAME"
echo "   - AWS_ACCESS_KEY_ID" 
echo "   - AWS_SECRET_ACCESS_KEY"
echo "   - AWS_ENDPOINT_URL_S3"
echo "   - AWS_REGION"
echo ""
echo "🚀 Deploy Secrets (para servidor de producción):"
echo "   - DEPLOY_HOST (ej: tu-servidor.com)"
echo "   - DEPLOY_USER (ej: ubuntu)"
echo "   - DEPLOY_KEY (tu SSH private key)"
echo "   - DEPLOY_PATH (ej: /home/ubuntu/chabi)"
echo ""

read -p "¿Quieres configurar los AWS secrets ahora? (y/n): " configure_aws

if [[ $configure_aws == "y" || $configure_aws == "Y" ]]; then
    echo ""
    read -p "BUCKET_NAME: " bucket_name
    read -p "AWS_ACCESS_KEY_ID: " aws_access_key
    read -s -p "AWS_SECRET_ACCESS_KEY: " aws_secret_key
    echo ""
    read -p "AWS_ENDPOINT_URL_S3: " aws_endpoint
    read -p "AWS_REGION (default: auto): " aws_region
    aws_region=${aws_region:-auto}
    
    echo ""
    echo "⏳ Configurando AWS secrets..."
    
    gh secret set BUCKET_NAME --body "$bucket_name"
    gh secret set AWS_ACCESS_KEY_ID --body "$aws_access_key"
    gh secret set AWS_SECRET_ACCESS_KEY --body "$aws_secret_key"
    gh secret set AWS_ENDPOINT_URL_S3 --body "$aws_endpoint"
    gh secret set AWS_REGION --body "$aws_region"
    
    echo "✅ AWS secrets configurados"
fi

read -p "¿Quieres configurar los deploy secrets ahora? (y/n): " configure_deploy

if [[ $configure_deploy == "y" || $configure_deploy == "Y" ]]; then
    echo ""
    read -p "DEPLOY_HOST: " deploy_host
    read -p "DEPLOY_USER: " deploy_user
    read -p "DEPLOY_PATH: " deploy_path
    
    echo ""
    echo "🔑 Para DEPLOY_KEY necesitas tu SSH private key."
    echo "Puedes:"
    echo "1. Pegar el contenido completo aquí"
    echo "2. Usar un archivo (ej: ~/.ssh/id_rsa)"
    echo ""
    read -p "¿Archivo SSH key path o 'paste' para pegar? (default: ~/.ssh/id_rsa): " key_input
    key_input=${key_input:-~/.ssh/id_rsa}
    
    if [[ "$key_input" == "paste" ]]; then
        echo "Pega tu SSH private key (termina con línea vacía):"
        deploy_key=""
        while IFS= read -r line; do
            [[ -z "$line" ]] && break
            deploy_key+="$line"$'\n'
        done
    else
        # Expandir ~ manualmente
        key_path="${key_input/#\~/$HOME}"
        if [[ -f "$key_path" ]]; then
            deploy_key=$(cat "$key_path")
        else
            echo "❌ Error: No se encuentra el archivo $key_path"
            exit 1
        fi
    fi
    
    echo ""
    echo "⏳ Configurando deploy secrets..."
    
    gh secret set DEPLOY_HOST --body "$deploy_host"
    gh secret set DEPLOY_USER --body "$deploy_user"
    gh secret set DEPLOY_KEY --body "$deploy_key"
    gh secret set DEPLOY_PATH --body "$deploy_path"
    
    echo "✅ Deploy secrets configurados"
fi

echo ""
echo "🎉 ¡Configuración completada!"
echo ""
echo "📝 Para ver todos los secrets configurados:"
echo "   gh secret list"
echo ""
echo "🚀 El workflow se ejecutará automáticamente en el siguiente push a main"
echo "   O puedes ejecutarlo manualmente con:"
echo "   gh workflow run deploy.yml"