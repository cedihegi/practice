provider "azurerm" {
  subscription_id = "9771f24f-d749-45bb-bc51-d036c4705d9e"
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = "example-rg"
  location = "switzerlandnorth"
}

resource "azurerm_container_registry" "acr" {
  name                = "cedihegiacr"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Standard"
  admin_enabled       = false
}

resource "azuread_application" "app" {
  display_name = "example-sp-app"
}

resource "azuread_service_principal" "sp" {
  client_id = azuread_application.app.client_id
}

resource "azurerm_role_assignment" "acr_admin" {
  scope                = azurerm_container_registry.acr.id
  role_definition_name = "AcrPush"
  principal_id         = azuread_service_principal.sp.id
}
