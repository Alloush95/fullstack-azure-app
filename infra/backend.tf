terraform {
  backend "azurerm" {
    resource_group_name  = "rg-storage-demo"
    storage_account_name = "demo0003"
    container_name       = "tfstate"
    key                  = "terraform.tfstate"
  }
}
