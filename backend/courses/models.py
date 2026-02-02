from django.db import models
from django.conf import settings
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

class Establishment(models.Model):
    name = models.CharField(max_length=150)
    code = models.CharField(max_length=50, unique=True)
    logo = models.ImageField(upload_to='establishments/logos/', null=True, blank=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Manager (Admin Etablissement)
    manager = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='managed_establishments'
    )

    def __str__(self):
        return f"{self.name} ({self.code})"

class Course(models.Model):
    class Status(models.TextChoices):
        DRAFT = 'DRAFT', _('Brouillon')
        PUBLISHED = 'PUBLISHED', _('Publié')
        ARCHIVED = 'ARCHIVED', _('Archivé')

    title = models.CharField(max_length=200)
    description = models.TextField()
    establishment = models.ForeignKey(
        Establishment,
        on_delete=models.CASCADE,
        related_name='courses',
        null=True,     # Nullable for now to ease migration/testing
        blank=True
    )
    coordinator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='coordinated_courses'
    )
    
    status = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.DRAFT
    )
    
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    
    registration_open_date = models.DateField(null=True, blank=True)
    registration_close_date = models.DateField(null=True, blank=True)
    
    capacity = models.PositiveIntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def is_open_for_registration(self):
        """
        [Règle Métier]
        Retourne VRAI si :
        status == PUBLISHED
        ET date du jour entre open_date et close_date
        """
        if self.status != self.Status.PUBLISHED:
            return False
            
        today = timezone.now().date()
        
        if self.registration_open_date and today < self.registration_open_date:
            return False
            
        if self.registration_close_date and today > self.registration_close_date:
            return False
            
        return True

    def __str__(self):
        return self.title
