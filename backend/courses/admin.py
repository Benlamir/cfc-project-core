from django.contrib import admin
from .models import Course, Establishment

@admin.register(Establishment)
class EstablishmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'manager')
    search_fields = ('name', 'code')

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'establishment', 'status', 'start_date', 'registration_open_date')
    list_filter = ('status', 'establishment')
    search_fields = ('title', 'description')
