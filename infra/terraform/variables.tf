variable "cluster_name" {
  type        = string
  description = "Nom du cluster"
  default     = "web-cluster"
}

variable "scw_access_key" {
  type        = string
  description = "Clé d'accès API Scaleway (Application terraform-projet-dev-web)"
  sensitive   = true
}

variable "scw_secret_key" {
  type        = string
  description = "Clé secrète API Scaleway"
  sensitive   = true
}

variable "scw_project_id" {
  type        = string
  description = "ID du projet Scaleway"
}

variable "scw_region" {
  type        = string
  description = "Région Scaleway"
  default     = "fr-par"
}

variable "k8s_version" {
  type        = string
  description = "Version de Kubernetes"
  default     = "1.31"
}

variable "node_type" {
  type        = string
  description = "Type de nœud Kubernetes"
  default     = "DEV1-M"
}

variable "node_count" {
  type        = number
  description = "Nombre de nœuds (workers)"
  default     = 2
}