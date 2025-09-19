from django.contrib import admin
from .models import HardwareInventory, CyberSecurityObservation

# Register your models here
admin.site.register(HardwareInventory)
admin.site.register(CyberSecurityObservation)
