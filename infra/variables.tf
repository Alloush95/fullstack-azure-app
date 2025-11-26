variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "italynorth"
}

variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "rg-fullstack-app"
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "frontend_image" {
  description = "Docker image for frontend"
  type        = string
  default     = "nginx:latest"
}

variable "backend_image" {
  description = "Docker image for backend"
  type        = string
  default     = "node:20-alpine"
}
