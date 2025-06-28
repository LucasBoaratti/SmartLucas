from django.urls import path
from . import views

urlpatterns = [ #URLs do APP 
    path("login/", view=views.Login.as_view(), name="Login do usuário."),
    path("ambiente/", view=views.AmbientesLCAPIView.as_view(), name="Criar e listar ambiente."),
    path("ambiente/<int:pk>/", view=views.AmbientesRUDAPIView.as_view(), name="Atualizar e excluir ambiente."),
    path("sensor/", view=views.SensoresLCAPIView.as_view(), name="Listar e criar sensores."),
    path("sensor/<int:pk>/", view=views.SensoresRUDAPIView.as_view(), name="Atualizar e excluir sensores."),
    path("historico/", view=views.HistoricoLCAPIView.as_view(), name="Listar e criar históricos."),
    path("historico/<int:pk>/", view=views.HistoricoRUDAPIView.as_view(), name="Atualizar e excluir históricos."),
    path("buscarNomeSensor/", view=views.BuscarSensor.as_view(), name="Buscar os nomes dos sensores."),  
    path("buscarStatusSensor/", view=views.BuscarStatusSensor.as_view(), name="Buscar status do sensor."), 
    path("atualizarStatusSensor/", view=views.AtualizarStatusSensor.as_view(), name="Atualizar status do sensor."),
    path("buscarSensorTemperaturaRegistrado/", view=views.VerSensoresTemperaturaRegistrados.as_view(), name="Buscar data de um sensor de temperatura já registrado./"),
    path("buscarSensorContagemRegistrado/", view=views.VerSensoresContagemRegistrados.as_view(), name="Buscar data de um sensor de contagem já registrado."),
    path("buscarSensorLuminosidadeRegistrado/", view=views.VerSensoresLuminosidadeRegistrados.as_view(), name="Buscar data de um sensor de iluminação já registrado."),
    path("buscarSensorUmidadeRegistrado/", view=views.VerSensoresUmidadeRegistrados.as_view(), name="Buscar data de um sensor de umidade já registrado."),
    path("cadastro/", view=views.UsuarioCadastradoLCAPIView.as_view(), name="Cadastrar usuário."),
]