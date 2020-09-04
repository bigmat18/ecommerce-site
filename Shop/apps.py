from django.apps import AppConfig


class ShopConfig(AppConfig):
    name = 'Shop'

    def ready(self):
        import Shop.signals