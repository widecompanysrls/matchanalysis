from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('create_session/', views.create_session, name='create_session'),
    path('create_room/', views.create_room, name='create_room'),
    path('create_dances/', views.create_dances, name='create_dances'),
    path('create_params/', views.create_params, name='create_params'),
    path('create_couples/', views.create_couples, name='create_couples'),
    path('create_judges/', views.create_judges, name='create_judges'),
    path('sort_heats/', views.manage_heats_and_solo_dances, name='manage_heats_and_solo_dances'),
    path('index_judge/', views.index_judges, name='index_judge'),
    path('matchAnalisys/', views.matchAnalisys, name='matchAnalisys'),
    path('matchAnalisysModify/', views.matchAnalisysModify, name='matchAnalisysModify'),
    path('sync_judges/', views.sync_judges, name='sync_judges'),
    # path('core/', views.core, name='core'),
    path('core2/', views.core2, name='core2'),
    path('results/', views.results, name="results"),
    path('index_results/', views.index_results, name="index_results"),
    path('finishjudging/', views.finishjudging, name="finishjudging"),

    # --API--
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('api/clean_db/', views.CleanDBView.as_view(), name='CleanDBView'),

    path('api/dances/<str:session_id>/', views.ShowDancesView.as_view(), name='ShowDancesView'),
    path('api/dances/<str:session_id>/<str:dance_name>/', views.DeleteDanceView.as_view(), name='DeleteDanceView'),

    path('api/params/<str:session_id>/', views.ShowParamsView.as_view(), name='ShowParamsView'),
    path('api/params/<str:session_id>/<str:param_name>/', views.DeleteParamView.as_view(), name='DeleteParamView'),

    path('api/couples/<str:session_id>/', views.ShowCouplesView.as_view(), name='ShowCouplesView'),
    path('api/couples/<str:session_id>/<int:couple_number>/', views.DeleteCoupleView.as_view(),
         name='DeleteCoupleView'),
    path('api/couples/<str:session_id>/', views.CoupleListView.as_view(), name='couple_list'),

    path('api/judges/<str:session_id>/', views.ShowJudgesView.as_view(), name="ShowJudgesView"),
    path('api/judges/<str:session_id>/<str:judge>/', views.DeleteJudgeView.as_view(), name="DeleteJudgeView"),

    path('api/active_judges/<str:session_id>/', views.ActiveJudgesView.as_view(), name='ActiveJudgesView'),

    path('api/random_method/<str:session_id>/<str:judge>/<str:dance>/', views.ShowParamsForJudgeForDance.as_view(),
         name="ShowParamsForJudgeForDance"),
    path('api/random_method/<str:session_id>/', views.ShowParamsRandomMethod.as_view(),
         name="ShowParamsRandomMethod"),

    path('api/start_session/<str:session_id>/', views.StartSessionView.as_view(), name="StartSessionView"),

    path('api/vote/<str:session_id>/reset/', views.DeleteAllVotationsView.as_view(), name="DeleteAllVotationsView"),
    path('api/vote/<str:session_id>/', views.ShowSessionVotationsView.as_view(), name="ShowSessionVotationsView"),
    path('api/vote/<str:session_id>/<int:couple_number>/<str:judge>/', views.JudgeVotePerCoupleView.as_view(),
         name="JudgeVotePerCoupleView"),
    path('api/vote/<str:session_id>/<int:couple_number>/<str:judge>/<str:dance>/',
         views.JudgeVotePerCouplePerDanceView.as_view(),
         name="JudgeVotePerCouplePerDanceView"),
    path('api/vote/<str:session_id>/<int:couple_number>/<str:judge>/<str:dance>/<str:param>/',
         views.JudgeVotePerCouplePerDancePerParamView.as_view(),
         name="JudgeVotePerCouplePerDancePerParamView"),
    path('api/vote/<str:session_id>/<int:couple_number>/', views.ShowAllVotationsPerCoupleView.as_view(),
         name="ShowAllVotationsPerCoupleView"),

    path('api/note/<str:session_id>/<int:couple_number>/<str:judge>/', views.JudgeNotePerCoupleView.as_view(),
         name="JudgeNotePerCoupleView"),
    path('api/note/<str:session_id>/<int:couple_number>/<str:judge>/<str:dance>/',
         views.JudgeNotePerCouplePerDanceView.as_view(),
         name="JudgeNotePerCouplePerDanceView"),
]
