from rest_framework.permissions import BasePermission

class IsAdministrador(BasePermission): #Classe de permissão do Admin
    def has_permission(self, request, view):
        if request.user.is_authenticated and request.user.funcao == "Administrador":
            return True
        return False
    
class IsProfessor(BasePermission): #Classe de permissão do professor
    def has_permission(self, request, view):
        if request.user.is_authenticated and request.user.funcao == "Professor":
            return True
        return False 