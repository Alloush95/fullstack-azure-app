# Setup GitHub Secrets for CI/CD

## Step 1: Create Service Principal with OIDC

Run this command in Azure CLI:

```bash
az ad sp create-for-rbac \
  --name "github-fullstack-app" \
  --role contributor \
  --scopes /subscriptions/YOUR_SUBSCRIPTION_ID/resourceGroups/rg-fullstack-app \
  --sdk-auth
```

## Step 2: Get Required Information

```bash
# Get your subscription ID
az account show --query id -o tsv

# Get your tenant ID
az account show --query tenantId -o tsv

# The client ID will be in the output from Step 1
```

## Step 3: Configure Federated Credentials for OIDC

```bash
# Get your subscription ID
SUBSCRIPTION_ID=$(az account show --query id -o tsv)

# Get the Application (client) ID from the service principal
APP_ID=$(az ad sp list --display-name "github-fullstack-app" --query "[0].appId" -o tsv)

# Create federated credential for main branch
az ad app federated-credential create \
  --id $APP_ID \
  --parameters '{
    "name": "github-main",
    "issuer": "https://token.actions.githubusercontent.com",
    "subject": "repo:Alloush95/fullstack-azure-app:ref:refs/heads/main",
    "audiences": ["api://AzureADTokenExchange"]
  }'
```

## Step 4: Add GitHub Secrets

Go to: https://github.com/Alloush95/fullstack-azure-app/settings/secrets/actions

Add these three secrets:

1. **AZURE_CLIENT_ID**: The `appId` from the service principal
2. **AZURE_TENANT_ID**: Your Azure tenant ID
3. **AZURE_SUBSCRIPTION_ID**: Your Azure subscription ID

## Step 5: Grant ACR Access

```bash
# Get ACR resource ID
ACR_ID=$(az acr show --name acrfullstackdev --resource-group rg-fullstack-app --query id -o tsv)

# Assign AcrPush role to service principal
az role assignment create \
  --assignee $APP_ID \
  --role AcrPush \
  --scope $ACR_ID
```

## Step 6: Test the Pipeline

Push your code to GitHub:

```bash
git add .
git commit -m "Add mock data and CI/CD pipeline"
git push origin main
```

Watch the workflow run at:
https://github.com/Alloush95/fullstack-azure-app/actions
