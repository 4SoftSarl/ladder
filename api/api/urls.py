from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from ladder.views import FrontEnd

urlpatterns = [
    path('/', FrontEnd.as_view()),
    path('admin/', admin.site.urls),
    path('api/', include('ladder.urls'))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
