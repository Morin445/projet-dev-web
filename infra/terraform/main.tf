terraform {
  required_version = ">= 1.6.0"

  required_providers {
    scaleway = {
      source  = "scaleway/scaleway"
      version = ">= 2.45"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.0"
    }
  }
}

resource "scaleway_k8s_cluster" "main" {
  name    = var.cluster_name
  version = var.k8s_version
  cni     = "cilium"
  region  = var.scw_region

  delete_additional_resources = false

  auto_upgrade {
    enable                        = true
    maintenance_window_start_hour = 3
    maintenance_window_day        = "monday"
  }
}

resource "scaleway_k8s_pool" "main_pool" {
  cluster_id = scaleway_k8s_cluster.main.id
  name       = "main-pool"
  node_type  = var.node_type
  size       = var.node_count

  autoscaling = false
  autohealing = true
}
