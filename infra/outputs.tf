output "resource_group_name" {
  description = "Name of the resource group"
  value       = azurerm_resource_group.main.name
}

output "acr_login_server" {
  description = "Login server for Azure Container Registry"
  value       = azurerm_container_registry.acr.login_server
}

output "acr_admin_username" {
  description = "Admin username for ACR"
  value       = azurerm_container_registry.acr.admin_username
  sensitive   = true
}

output "backend_url" {
  description = "URL of the backend app"
  value       = "https://${azurerm_linux_web_app.backend.default_hostname}"
}

output "frontend_url" {
  description = "URL of the frontend app"
  value       = "https://${azurerm_linux_web_app.frontend.default_hostname}"
}

output "backend_app_name" {
  description = "Name of the backend app service"
  value       = azurerm_linux_web_app.backend.name
}

output "frontend_app_name" {
  description = "Name of the frontend app service"
  value       = azurerm_linux_web_app.frontend.name
}
