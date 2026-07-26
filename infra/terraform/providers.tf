provider "scaleway" {
    access_key = var.scw_access_key
    secret_key = var.scw_secret_key
    project_id = var.scw_project_id
    region     = var.scw_region
    zone       = "${var.scw_region}-1"
}

