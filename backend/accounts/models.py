from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

# Department/Factory choices
DEPARTMENTS = [
    ('HR', 'HR'),
    ('Manufacturing', 'Manufacturing'),
    ('Factory A', 'Factory A'),
    ('Factory B', 'Factory B'),
]

EQUIPMENT_TYPES = [
    ('PC', 'PC'),
    ('Laptop', 'Laptop'),
    ('Printer', 'Printer'),
    ('Scanner', 'Scanner'),
    ('Other', 'Other'),
]

NETWORK_STATUS = [
    ('Intranet', 'Intranet'),
    ('Internet', 'Internet'),
    ('Both', 'Both'),
]

POLICY_COMPLIANCE = [
    ('Compliant', 'Compliant'),
    ('Non-Compliant', 'Non-Compliant'),
]

TAGGED = [
    ('Yes', 'Yes'),
    ('No', 'No'),
]

OBSERVATION_SEVERITY = [
    ('Low', 'Low'),
    ('Medium', 'Medium'),
    ('High', 'High'),
    ('Critical', 'Critical'),
]

OBSERVATION_STATUS = [
    ('Open', 'Open'),
    ('In Progress', 'In Progress'),
    ('Resolved', 'Resolved'),
]

OBSERVATION_DESC = [
    ('Outdated antivirus software detected', 'Outdated antivirus software detected'),
    ('Unauthorized software installed', 'Unauthorized software installed'),
    ('Equipment accessible via public IP without firewall protection', 'Equipment accessible via public IP without firewall protection'),
    ('Missing security patches on operating system', 'Missing security patches on operating system'),
    ('Weak password policy detected', 'Weak password policy detected'),
    ('Unencrypted data transmission detected', 'Unencrypted data transmission detected'),
    ('Physical access to equipment unsecured', 'Physical access to equipment unsecured'),
]

# models.py
from django.db import models

class HardwareInventory(models.Model):
    department_factory = models.CharField(max_length=100)
    equipment_type = models.CharField(max_length=50)
    quantity = models.IntegerField()
    date_added = models.DateField(auto_now_add=True)

class CyberSecurityObservation(models.Model):
    department_factory = models.CharField(max_length=100)
    observation_description = models.CharField(max_length=255)
    severity = models.CharField(max_length=50)
    status = models.CharField(max_length=50)
    date_observed = models.DateField()
    assigned_to = models.CharField(max_length=100)
