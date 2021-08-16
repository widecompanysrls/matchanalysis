from django.http import HttpResponse, Http404
from django.shortcuts import render
import os, random, uuid, base64, itertools
from .models import *
from django.contrib.sessions.models import Session
from django.contrib.auth.models import User
from django.forms import ValidationError
from .forms.forms import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers.serializer import *
from django import forms
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.contrib.auth.models import User

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def index(request):
    indexForm = IndexForm()

    return render(request, "index.html", {'indexForm': indexForm})


def create_session(request):
    sessions = []
    try:
        s = DbSession.objects.all()
        for i in s:
            sessions.append(i.id)
        while True:
            session_id = uuid.uuid4()
            if session_id not in sessions:
                break

        request.session['session_id'] = str(session_id)
    except:
        raise Http404('error')

    return render(request, "create_session.html", {'session': session_id, 'SessionForm': SessionForm})


def create_room(request):
    if request.method == 'POST':
        form = SessionForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['Nome']
            psw = form.cleaned_data['Password']
            # name = request.POST['Nome']
            # psw = request.POST['Password']
            session_id = request.session['session_id']
            s = DbSession(id=session_id, name=name, password=psw)
            s.save()
            return render(request, "create_dances.html", {'session': session_id, 'DanceForm': DanceForm})
        else:
            raise ValidationError("error", 500)


def create_dances(request):
    user = "WideMatchAnalysis-Wide2021"
    message_bytes = user.encode('ascii')
    base64_bytes = base64.b64encode(message_bytes).decode('utf-8')
    if request.method == 'POST':
        form = DanceForm(request.POST)
        if form.is_valid():
            ballo = form.cleaned_data['Nome']
            session_id = request.session['session_id']
            try:
                d = Dance(name=ballo, fk_session=session_id)
                d.save()
                return render(request, "create_dances.html",
                              {'session': session_id, 'DanceForm': DanceForm, 'form': form, 'user': base64_bytes})
            except:

                return render(request, "create_dances.html",
                              {'session': session_id, 'DanceForm': DanceForm, 'form': form, 'user': base64_bytes,
                               'error': True})
        else:
            session_id = request.session['session_id']
            return render(request, "create_dances.html",
                          {'session': session_id, 'DanceForm': DanceForm, 'form': form, 'user': base64_bytes})
    else:
        session_id = request.session['session_id']
        return render(request, "create_dances.html",
                      {'session': session_id, 'DanceForm': DanceForm, 'user': base64_bytes})


def create_params(request):
    user = "WideMatchAnalysis-Wide2021"
    message_bytes = user.encode('ascii')
    base64_bytes = base64.b64encode(message_bytes).decode('utf-8')
    if request.method == 'POST':
        form = ParamForm(request.POST)
        if form.is_valid():
            session_id = request.session['session_id']
            param = form.cleaned_data['Nome']
            try:
                p = Paramether(name=param, fk_session=session_id)
                p.save()
                return render(request, "create_params.html",
                              {'session': session_id, 'ParamsForm': ParamForm, 'user': base64_bytes})
            except:
                return render(request, "create_params.html",
                              {'session': session_id, 'ParamsForm': ParamForm, 'user': base64_bytes, 'error': True})
    else:
        session_id = request.session['session_id']
        return render(request, "create_params.html",
                      {'session': session_id, 'ParamsForm': ParamForm, 'user': base64_bytes})


def create_judges(request):
    user = "WideMatchAnalysis-Wide2021"
    message_bytes = user.encode('ascii')
    base64_bytes = base64.b64encode(message_bytes).decode('utf-8')
    if request.method == 'POST':
        form = JudgeForm(request.POST)
        if form.is_valid():
            judge_name = form.cleaned_data['name'].lower()
            judge_surname = form.cleaned_data['surname'].lower()
            judge_id_login = form.cleaned_data['id_login'].upper()
            session_id = request.session['session_id']
            try:
                j = Judge(name=judge_name, surname=judge_surname, fk_session=session_id, id_login=judge_id_login)
                j.save()
                return render(request, "create_judges.html",
                              {'session': session_id, 'JudgeForm': JudgeForm, 'user': base64_bytes})
            except:
                return render(request, "create_judges.html",
                              {'session': session_id, 'JudgeForm': JudgeForm, 'user': base64_bytes, 'error': True})
        else:
            print('aa')
    else:
        session_id = request.session['session_id']
        return render(request, "create_judges.html",
                      {'session': session_id, 'JudgeForm': JudgeForm, 'user': base64_bytes})


def create_couples(request):
    user = "WideMatchAnalysis-Wide2021"
    message_bytes = user.encode('ascii')
    base64_bytes = base64.b64encode(message_bytes).decode('utf-8')
    if request.method == 'POST':
        form = CoupleForm(request.POST)
        if form.is_valid():
            name1 = form.cleaned_data['name1']
            surname1 = form.cleaned_data['surname1']
            name2 = form.cleaned_data['name2']
            surname2 = form.cleaned_data['surname2']
            number = form.cleaned_data['number']
            session_id = request.session['session_id']
            email = form.cleaned_data['email']

            try:
                c = Couple(name1=name1, name2=name2, surname1=surname1, surname2=surname2, number=number, email=email,
                           fk_session=session_id)
                c.save()
                return render(request, "create_couples.html",
                              {'session': session_id, 'CoupleForm': CoupleForm, 'user': base64_bytes})
            except:

                return render(request, "create_couples.html",
                              {'session': session_id, 'CoupleForm': CoupleForm, 'user': base64_bytes, 'error': True})
        else:
            raise ValidationError({'Errore': ["valore dei campi errato", ]})
    else:
        session_id = request.session['session_id']
        return render(request, "create_couples.html",
                      {'session': session_id, 'CoupleForm': CoupleForm, 'user': base64_bytes, 'error': True})


def manage_heats_and_solo_dances(request):
    user = "WideMatchAnalysis-Wide2021"
    message_bytes = user.encode('ascii')
    base64_bytes = base64.b64encode(message_bytes).decode('utf-8')
    if request.method == 'POST':
        session_id = request.session['session_id']
    else:
        session_id = request.session['session_id']
        dances = Dance.objects.filter(fk_session=session_id)
        params = Paramether.objects.filter(fk_session=session_id)
        judges = Judge.objects.filter(fk_session=session_id)
        params_list = list(p.name for p in params)
        judges_list = list(j.id_login for j in judges)
        dances_list = list(d.name for d in dances)
        max_params_per_judge = 0
        min_params_per_judge = 0
        if len(judges) >= len(params_list):
            max_params_per_judge = len(params_list)
            min_params_per_judge = 1
        else:
            max_params_per_judge = len(params_list)
            for k in range(0, len(params_list), 1):
                if len(judges_list) * k >= len(params_list):
                    min_params_per_judge = k
                    break
        max_params = list(range(min_params_per_judge, max_params_per_judge + 1, 1))
        dances_pack = manage_list(dances_list, 5, 5)
        return render(request, "manage_heats.html",
                      {'session': session_id, 'dances': dances, 'dances_list': dances_list, 'params': params,
                       'params_list': params_list,
                       'max_params_per_judge': max_params, 'user': base64_bytes,
                       'dances_pack': dances_pack
                       })


def index_judges(request):
    user = "WideMatchAnalysis-Wide2021"
    message_bytes = user.encode('ascii')
    base64_bytes = base64.b64encode(message_bytes).decode('utf-8')
    if request.method == 'POST':
        form = IndexForm(request.POST)
        if form.is_valid():
            session_id = form.cleaned_data['session_id']
            psw = form.cleaned_data['session_psw']
            try:
                s = DbSession.objects.get(id=session_id, password=psw)
                if s:
                    return render(request, "index_judges.html",
                                  {'session_id': session_id, 'JudgeForm': JudgeForm, 'user': base64_bytes})
                else:
                    return render(request, "session_not_found.html")
            except:
                return render(request, "session_not_found.html")
        else:
            print(form.errors)
            raise ValidationError("error_index", code=500)


def matchAnalisys(request):
    user = "WideMatchAnalysis-Wide2021"
    message_bytes = user.encode('ascii')
    base64_bytes = base64.b64encode(message_bytes).decode('utf-8')
    if request.method == 'POST':
        session_id = request.POST['session_id']
        print(session_id)
        judge_id = request.POST['judge_id']
        try:
            j = Judge.objects.filter(fk_session=session_id, id_login=judge_id)
            if j:
                aj = ActiveJudges.objects.get(fk_session=DbSession.objects.get(id=session_id),
                                              fk_judge=Judge.objects.get(fk_session=session_id,
                                                                         id_login=judge_id))
                if aj.active == 0:
                    judge_logged = Judge.objects.get(fk_session=session_id, id_login=judge_id)
                    dances = Dance.objects.filter(fk_session=session_id)
                    params = Paramether.objects.filter(fk_session=session_id)
                    couples = Couple.objects.filter(fk_session=session_id)
                    judges = Judge.objects.filter(fk_session=session_id)
                    return render(request, "matchAnalisys.html",
                                  {'dances': dances, 'params': params, 'couples': couples, 'session_id': session_id,
                                   'judges': judges, 'user': base64_bytes, 'judge_logged': judge_logged})
                else:
                    return render(request, "judge_not_found.html", {'msg': 'Giudice già regisrato'})
            else:
                return render(request, "judge_not_found.html", {'msg': 'Giudice non esistente per questa sessione'})
        except:
            return render(request, "judge_not_found.html", {'msg': 'Giudice non esistente per questa sessione'})


def matchAnalisysModify(request):
    user = "WideMatchAnalysis-Wide2021"
    message_bytes = user.encode('ascii')
    base64_bytes = base64.b64encode(message_bytes).decode('utf-8')
    if request.method == 'GET':
        solo_dances = request.GET['solo_dances_hidden']
        heats_dances = request.GET['heats_dances_hidden']
        solo_dances_params_number = int(request.GET['solo_dances_params_number_hidden'])
        heats_dances_params_number = int(request.GET['heats_dances_params_number_hidden'])
        heats_dances_list = heats_dances.split('__')
        solo_dances_list = solo_dances.split('__')
        # print(heats_dances_list, heats_dances_params_number)
        # print(solo_dances_list, solo_dances_params_number)

        # print(solo_dances, heats_dances)
        # print(solo_dances_params_number, heats_dances_params_number)
        if request.session['session_id'] != '':
            session_id = request.session['session_id']
        else:
            session_id = request.GET['session_id']

        dances = Dance.objects.filter(fk_session=session_id)
        params = Paramether.objects.filter(fk_session=session_id)
        couples = Couple.objects.filter(fk_session=session_id)
        judges = Judge.objects.filter(fk_session=session_id)
        judges_list = list(j.id for j in judges)
        params_list = list(p.name for p in params)
        extended_solo_params = list(p.name for p in params)
        extended_heats_params = extended_solo_params.copy()
        p = extended_solo_params.copy()
        #########
        # extended_solo_params = [1, 2, 3]
        # p = extended_solo_params.copy()
        # judges_list = ['a', 'b', 'c']
        # solo_dances_params_number = 3
        ###################

        solo_list = [[] for i in range(len(judges_list))]
        if len(judges_list) < len(extended_solo_params):
            random.shuffle(extended_solo_params)
            if solo_dances_params_number == len(extended_solo_params):
                for i in range(len(judges_list)):
                    solo_list[i] = sorted(extended_solo_params)
            else:
                for i in range(int(solo_dances_params_number) * len(judges_list) - len(extended_solo_params)):
                    random_choice = random.choice(p)
                    slice_index = -(solo_dances_params_number - 1)
                    if solo_dances_params_number == 1:
                        slice_index = -1
                    while random_choice in extended_solo_params[slice_index:]:
                        random_choice = random.choice(p)

                    extended_solo_params.append(random_choice)

                for i in range(len(judges_list)):
                    solo_list[i] = sorted(extended_solo_params[
                                          0 + solo_dances_params_number * i:solo_dances_params_number + solo_dances_params_number * i])

        elif len(judges_list) >= len(extended_solo_params):
            random.shuffle(extended_solo_params)

            if (solo_dances_params_number * len(judges_list)) // len(extended_solo_params) >= solo_dances_params_number:

                for i in range(int(solo_dances_params_number) * len(judges_list) - len(extended_solo_params)):
                    random_choice = random.choice(p)
                    slice_index = -(solo_dances_params_number - 1)
                    if solo_dances_params_number == 1:
                        slice_index = -1
                    while random_choice in extended_solo_params[slice_index:]:
                        random_choice = random.choice(p)
                    extended_solo_params.append(random_choice)

                for i in range(len(judges_list)):
                    solo_list[i] = sorted(extended_solo_params[
                                          0 + solo_dances_params_number * i:solo_dances_params_number + solo_dances_params_number * i])

        print(solo_list)
        formatted_solo_list = []
        for i in solo_list:
            formatted_solo_list.append('-'.join(i))

        heats_list = [[] for i in range(len(judges_list))]
        if len(judges_list) < len(extended_heats_params):
            random.shuffle(extended_heats_params)
            if heats_dances_params_number == len(extended_heats_params):
                for i in range(len(judges_list)):
                    heats_list[i] = sorted(extended_heats_params)
            else:
                for i in range(int(heats_dances_params_number) * len(judges_list) - len(extended_heats_params)):
                    random_choice = random.choice(p)
                    slice_index = -(heats_dances_params_number - 1)
                    if heats_dances_params_number == 1:
                        slice_index = -1
                    while random_choice in extended_heats_params[slice_index:]:
                        random_choice = random.choice(p)

                    extended_heats_params.append(random_choice)

                for i in range(len(judges_list)):
                    heats_list[i] = sorted(extended_heats_params[
                                           0 + heats_dances_params_number * i:heats_dances_params_number + heats_dances_params_number * i])

        elif len(judges_list) >= len(extended_heats_params):
            random.shuffle(extended_heats_params)

            if (heats_dances_params_number * len(judges_list)) // len(
                    extended_heats_params) >= heats_dances_params_number:

                for i in range(int(heats_dances_params_number) * len(judges_list) - len(extended_heats_params)):
                    random_choice = random.choice(p)
                    slice_index = -(heats_dances_params_number - 1)
                    if heats_dances_params_number == 1:
                        slice_index = -1
                    while random_choice in extended_heats_params[slice_index:]:
                        random_choice = random.choice(p)
                    extended_heats_params.append(random_choice)

                for i in range(len(judges_list)):
                    heats_list[i] = sorted(extended_heats_params[
                                           0 + heats_dances_params_number * i:heats_dances_params_number + heats_dances_params_number * i])

        print(heats_list)
        formatted_heats_list = []
        for i in heats_list:
            formatted_heats_list.append('-'.join(i))
        return render(request, "matchAnalisysModify.html",
                      {'dances': dances, 'params': params, 'couples': couples, 'session_id': session_id,
                       'judges': judges, 'judges_list': judges_list, 'user': base64_bytes,
                       'solo_list': formatted_solo_list,
                       'solo_dances': solo_dances_list,
                       'heats_list': formatted_heats_list, 'heats_dances': heats_dances_list})


def sync_judges(request):
    user = "WideMatchAnalysis-Wide2021"
    message_bytes = user.encode('ascii')
    base64_bytes = base64.b64encode(message_bytes).decode('utf-8')
    if request.method == 'POST':
        session_id = request.POST['session_id']
        judge = request.POST['judge']
        return render(request, "sync_judges.html", {'user': base64_bytes, 'session_id': session_id,
                                                    'judge': judge,
                                                    })


# def core(request):
#     user = "WideMatchAnalysis-Wide2021"
#     message_bytes = user.encode('ascii')
#     base64_bytes = base64.b64encode(message_bytes).decode('utf-8')
#     if request.method == "GET":
#         try:
#             session_id = request.session['session_id']
#         except:
#             session_id = request.GET['session_id']
#
#         response = Response()
#         dances = Dance.objects.filter(fk_session=session_id)
#         params = Paramether.objects.filter(fk_session=session_id)
#         couples = Couple.objects.filter(fk_session=session_id)
#         cookies_to_delete = []
#         for i in request.COOKIES:
#             if i not in ['csrftoken', 'sessionid']:
#                 cookies_to_delete.append(i)
#
#         return render(request, "core.html",
#                       {'dances': dances, 'params': params, 'couples': couples, 'session_id': session_id,
#                        'judge': request.session['judge'], 'user': base64_bytes})


def manage_list(list, big_pack, small_pack):
    final_list = []
    counter_small = 0
    counter_big = 0
    counter_1 = 0
    for counter, i in enumerate(list):
        if counter_1 % big_pack == 0:
            final_list.append([])
            if counter_1 != 0:
                counter_big += 1
                counter_small = 0
                counter_1 = 0
        if counter_1 % small_pack == 0:
            final_list[counter_big].append([])
            if counter_1 != 0:
                counter_small += 1
        final_list[counter_big][counter_small].append(str(i))
        counter_1 += 1
    # print(final_list)
    return final_list


def core2(request):
    user = "WideMatchAnalysis-Wide2021"
    message_bytes = user.encode('ascii')
    base64_bytes = base64.b64encode(message_bytes).decode('utf-8')
    if request.method == "GET":
        session_id = request.GET['session_id']
        judge = request.GET['judge']

        response = Response()
        dances = Dance.objects.filter(fk_session=session_id)
        params = Paramether.objects.filter(fk_session=session_id)
        couples = Couple.objects.filter(fk_session=session_id)
        couples_list = manage_list(sorted(list(c.number for c in couples)), 6, 3)
        params_list = manage_list(list(p.name for p in params), 10, 5)
        cookies_to_delete = []
        for i in request.COOKIES:
            if i not in ['csrftoken', 'sessionid']:
                cookies_to_delete.append(i)

        return render(request, "core2.html",
                      {
                          'dances': dances,
                          'params': list(p.name for p in params),
                          'couples': couples_list,
                          'couple_list': list(c.number for c in couples),
                          'votes': [['1', '2', '3', '4', '5'], ['6', '7', '8', '9', '10']],
                          'session_id': session_id,
                          'judge': judge,
                          'user': base64_bytes
                      })


def results(request):
    user = "WideMatchAnalysis-Wide2021"
    message_bytes = user.encode('ascii')
    base64_bytes = base64.b64encode(message_bytes).decode('utf-8')
    if request.method == "POST":
        form = ResultsForm(request.POST)
        if form.is_valid():
            session_id = form.cleaned_data['session_id']
            email = form.cleaned_data['email']
            response = Response()
            try:
                s = DbSession.objects.get(id=session_id)
                if s:
                    try:
                        c = Couple.objects.get(fk_session=session_id, email=email)
                        if c:
                            number = c.number
                            dances = Dance.objects.filter(fk_session=session_id)
                            params = Paramether.objects.filter(fk_session=session_id)
                            couples = Couple.objects.filter(fk_session=session_id)
                            judges = Judge.objects.filter(fk_session=session_id)
                            dances_list = list(d.name for d in dances)
                            params_list = list(p.name for p in params)
                            params_list.append('notes')
                            judges_list = list(j.name + '  ' + j.surname + '-' + j.id_login for j in judges)
                            votes_list = []
                            names_list = []
                            for count_dances, d in enumerate(dances_list):
                                votes_list.append([])
                                for count_params, p in enumerate(params_list):
                                    votes_list[count_dances].append([])
                                    for count_judges, j in enumerate(judges_list):
                                        votes_list[count_dances][count_params].append([])
                            params_list.remove('notes')
                            for count_dances, d in enumerate(dances_list):
                                for count_params, p in enumerate(params_list):
                                    for count_judges, j in enumerate(judges_list):
                                        v = Votation.objects.filter(fk_session=DbSession.objects.get(id=session_id),
                                                                    fk_dance=Dance.objects.get(fk_session=session_id,
                                                                                               name=d),
                                                                    fk_parameter=Paramether.objects.get(
                                                                        fk_session=session_id, name=p),
                                                                    fk_judge=Judge.objects.get(fk_session=session_id,
                                                                                               id_login=j.split('-')[
                                                                                                   1]),
                                                                    fk_couple=Couple.objects.get(fk_session=session_id,
                                                                                                 email=email))
                                        n = Note.objects.filter(fk_session=DbSession.objects.get(id=session_id),
                                                                fk_dance=Dance.objects.get(fk_session=session_id,
                                                                                           name=d),
                                                                fk_judge=Judge.objects.get(fk_session=session_id,
                                                                                           id_login=j.split('-')[
                                                                                               1]),
                                                                fk_couple=Couple.objects.get(fk_session=session_id,
                                                                                             email=email))
                                        if v:
                                            for i in v:
                                                votes_list[count_dances][count_params][count_judges] = i.vote
                                        else:
                                            votes_list[count_dances][count_params][count_judges] = 0
                                        if n:
                                            votes_list[count_dances][len(params_list)][count_judges] = n[0].notes
                                        else:
                                            votes_list[count_dances][len(params_list)][count_judges] = ''
                            params_list.append('notes')
                            print(dances_list)
                            print(params_list)
                            print(votes_list)
                            print(judges_list)

                            return render(request, "results.html",
                                          {'dances': dances, 'params': params, 'couples': couples, 'number': number,
                                           'session_id': session_id,
                                           'user': base64_bytes,
                                           'votes': votes_list,
                                           'dances_list': dances_list,
                                           'params_list': params_list,
                                           'judges_list': judges_list,
                                           'selected_couple': c,
                                           'selected_couple': c,
                                           })
                        else:
                            form = ResultsForm()
                            return render(request, "index_results.html", {'form': form, 'error': 'email'})
                    except:
                        form = ResultsForm()
                        return render(request, "index_results.html", {'form': form, 'error': 'email'})
                else:
                    form = ResultsForm()
                    return render(request, "index_results.html", {'form': form, 'error': 'session'})
            except:
                form = ResultsForm()
                return render(request, "index_results.html", {'form': form, 'error': 'session'})
        else:
            print('e')
            form = ResultsForm()
            return render(request, "index_results.html", {'form': form})


def index_results(request):
    if request.method == 'GET':
        form = ResultsForm()
        return render(request, "index_results.html", {'form': form})


def finishjudging(request):
    if request.method == 'GET':
        return render(request, "finishJudging.html")


# API
class CoupleListView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, session_id):
        couples = Couple.objects.filter(fk_session=session_id)
        serializer = CoupleSerializer(couples, many=True)
        return Response(serializer.data)


class CleanDBView(APIView):
    permission_classes = (IsAuthenticated,)

    def delete(self, request):
        DbSession.objects.all().delete()
        Votation.objects.all().delete()
        Session.objects.all().delete()
        Couple.objects.all().delete()
        Dance.objects.all().delete()
        Paramether.objects.all().delete()
        Note.objects.all().delete()
        Judge.objects.all().delete()
        RandomMethod.objects.all().delete()
        StartSession.objects.all().delete()
        ActiveJudges.objects.all().delete()
        return Response("Database cleaned", 205)


class StartSessionView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, session_id):
        ss = StartSession.objects.filter(fk_session=session_id)
        serializer = StartSessionSerializer(ss, many=True)
        return Response(serializer.data)

    def post(self, request, session_id):
        start = request.POST['start']
        try:
            ss = StartSession.objects.filter(fk_session=DbSession.objects.get(id=session_id))
            if ss:
                ss.update(start=start)
                return Response('Updated', 200)
            else:
                ss = StartSession(fk_session=DbSession.objects.get(id=session_id), start=start)
                ss.save()
                return Response('Created', 200)
        except:
            ss = StartSession(fk_session=DbSession.objects.get(id=session_id), start=start)
            ss.save()
            return Response('Created', 200)


class ShowDancesView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, session_id):
        d = Dance.objects.filter(fk_session=session_id)
        serializer = DanceSerializer(d, many=True)
        return Response(serializer.data)


class DeleteDanceView(APIView):
    permission_classes = (IsAuthenticated,)

    def delete(self, request, session_id, dance_name):
        d = Dance.objects.filter(fk_session=session_id, name=dance_name).delete()
        return Response({"Deleted", 204})


class ShowParamsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, session_id):
        p = Paramether.objects.filter(fk_session=session_id)
        serializer = ParamSerializer(p, many=True)
        return Response(serializer.data)


class DeleteParamView(APIView):
    permission_classes = (IsAuthenticated,)

    def delete(self, request, session_id, param_name):
        p = Paramether.objects.filter(fk_session=session_id, name=param_name).delete()
        return Response({"Deleted", 204})


class ShowCouplesView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, session_id):
        c = Couple.objects.filter(fk_session=session_id)
        serializer = CoupleSerializer(c, many=True)
        return Response(serializer.data)


class DeleteCoupleView(APIView):
    permission_classes = (IsAuthenticated,)

    def delete(self, request, session_id, couple_number):
        c = Couple.objects.filter(fk_session=session_id, number=couple_number).delete()
        return Response({"Deleted": 204})


class ShowJudgesView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, session_id):
        j = Judge.objects.filter(fk_session=session_id)
        serializer = JudgeSerializer(j, many=True)
        return Response(serializer.data)


class ActiveJudgesView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, session_id):
        aj = ActiveJudges.objects.filter(fk_session=session_id)
        serializer = ActiveJudgesSerializer(aj, many=True)
        return Response(serializer.data)

    def post(self, request, session_id):
        judge = request.POST['judge']
        judge_name = judge.split('__')[0]
        judge_surname = judge.split('__')[1]
        judge_id_login = judge.split('__')[2]
        active = request.POST['active']
        try:
            aj = ActiveJudges.objects.filter(fk_session=DbSession.objects.get(id=session_id),
                                             fk_judge=Judge.objects.get(fk_session=session_id, name=judge_name,
                                                                        surname=judge_surname, id_login=judge_id_login))
            if aj:
                aj.update(active=active)
                return Response('Updated', 200)
            else:
                aj = ActiveJudges(fk_session=DbSession.objects.get(id=session_id),
                                  fk_judge=Judge.objects.get(fk_session=session_id, name=judge_name,
                                                             surname=judge_surname, id_login=judge_id_login),
                                  active=active)
                aj.save()
                return Response('Created', 200)
        except:
            aj = ActiveJudges(fk_session=DbSession.objects.get(id=session_id),
                              fk_judge=Judge.objects.get(fk_session=session_id, name=judge_name, surname=judge_surname,
                                                         id_login=judge_id_login), active=active)
            aj.save()
            return Response('Created', 200)


class DeleteJudgeView(APIView):
    permission_classes = (IsAuthenticated,)

    def delete(self, request, session_id, judge):
        judge_name = judge.split('_')[1]
        judge_surname = judge.split('_')[2]
        judge_id_login = judge.split('_')[0]
        j = Judge.objects.filter(fk_session=session_id, name=judge_name, surname=judge_surname,
                                 id_login=judge_id_login).delete()
        return Response({"Deleted", 204})


class ShowSessionVotationsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, session_id):
        v = Votation.objects.filter(fk_session=session_id)
        serializer = VoteSerializer(v, many=True)
        return Response(serializer.data)


class ShowParamsRandomMethod(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, session_id):
        rm = RandomMethod.objects.filter(fk_session=DbSession(id=session_id))
        print(rm)
        serializer = RandomMethodSerializer(rm, many=True)
        return Response(serializer.data)


class ShowParamsForJudgeForDance(APIView):
    # permission_classes = (IsAuthenticated,)

    def get(self, request, session_id, judge, dance):
        # RandomMethod.objects.all().delete()
        # return Response('deleted', 200)
        judge_id_login = str(judge).split(' - ')[0]
        judge_name = str(judge).split(' - ')[1].split('_')[0]
        judge_surname = str(judge).split(' - ')[1].split('_')[1]
        rm = RandomMethod.objects.filter(fk_session=session_id,
                                         fk_judge=Judge.objects.get(name=judge_name, surname=judge_surname,
                                                                    id_login=judge_id_login,
                                                                    fk_session=session_id),
                                         fk_dance=Dance.objects.get(name=dance, fk_session=session_id))
        serializer = RandomMethodSerializer(rm, many=True)
        return Response(serializer.data)

    def post(self, request, session_id, judge, dance):
        param = request.POST['param_name']
        try:
            rm = RandomMethod.objects.filter(fk_session=session_id,
                                             fk_judge=Judge.objects.get(fk_session=session_id, pk=judge),
                                             fk_dance=Dance.objects.get(name=dance, fk_session=session_id),
                                             fk_paramether=Paramether.objects.get(name=param, fk_session=session_id))
            if rm:
                return Response('Updated', 200)

            else:
                rm = RandomMethod(fk_session=DbSession.objects.get(id=session_id),
                                  fk_judge=Judge.objects.get(fk_session=session_id, pk=judge),
                                  fk_dance=Dance.objects.get(name=dance, fk_session=session_id),
                                  fk_paramether=Paramether.objects.get(name=param, fk_session=session_id))
                rm.save()
                return Response('Created', 200)
        except:
            rm = RandomMethod(fk_session=DbSession.objects.get(id=session_id),
                              fk_judge=Judge.objects.get(fk_session=session_id, pk=judge),
                              fk_dance=Dance.objects.get(name=dance, fk_session=session_id),
                              fk_paramether=Paramether.objects.get(name=param, fk_session=session_id))
            rm.save()
            return Response('Created', 200)


class JudgeVotePerCoupleView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, session_id, couple_number, judge):
        judge_id_login = str(judge).split(' - ')[0]
        judge_name = str(judge).split(' - ')[1].split('_')[0]
        judge_surname = str(judge).split(' - ')[1].split('_')[1]
        v = Votation.objects.filter(fk_session=session_id,
                                    fk_couple=Couple.objects.get(fk_session=session_id, number=couple_number),
                                    fk_judge=Judge.objects.get(name=judge_name, surname=judge_surname,
                                                               id_login=judge_id_login,
                                                               fk_session=session_id))
        serializer = VoteSerializer(v, many=True)
        return Response(serializer.data)

    def post(self, request, session_id, couple_number, judge):
        param = request.POST['param']
        vote = request.POST['vote']
        dance = request.POST['dance']
        judge_id_login = str(judge).split(' - ')[0]
        judge_name = str(judge).split(' - ')[1].split('_')[0]
        judge_surname = str(judge).split(' - ')[1].split('_')[1]
        try:
            v1 = Votation.objects.filter(fk_session=DbSession.objects.get(id=session_id),
                                         fk_parameter=Paramether.objects.get(fk_session=session_id, name=param),
                                         fk_dance=Dance.objects.get(fk_session=session_id, name=dance),
                                         fk_judge=Judge.objects.get(fk_session=session_id, name=judge_name,
                                                                    surname=judge_surname, id_login=judge_id_login),
                                         fk_couple=Couple.objects.get(fk_session=session_id,
                                                                      number=couple_number))
            if v1:
                v1.update(vote=vote)
                return Response('Updated', 200)
            else:
                v = Votation(fk_session=DbSession.objects.get(id=session_id),
                             fk_parameter=Paramether.objects.get(fk_session=session_id, name=param),
                             fk_dance=Dance.objects.get(fk_session=session_id, name=dance),
                             fk_judge=Judge.objects.get(fk_session=session_id, name=judge_name, id_login=judge_id_login,
                                                        surname=judge_surname),
                             fk_couple=Couple.objects.get(fk_session=session_id,
                                                          number=couple_number),
                             vote=vote)
                v.save()
                return Response('Created', 200)
        except:
            v = Votation(fk_session=DbSession.objects.get(id=session_id),
                         fk_parameter=Paramether.objects.get(fk_session=session_id, name=param),
                         fk_dance=Dance.objects.get(fk_session=session_id, name=dance),
                         fk_judge=Judge.objects.get(fk_session=session_id, name=judge_name,
                                                    surname=judge_surname, id_login=judge_id_login),
                         fk_couple=Couple.objects.get(fk_session=session_id,
                                                      number=couple_number),
                         vote=vote)
            v.save()
            return Response('Created', 200)


class JudgeVotePerCouplePerDanceView(APIView):
    # permission_classes = (IsAuthenticated,)

    def get(self, request, session_id, couple_number, judge, dance):
        judge_id_login = str(judge).split(' - ')[0]
        judge_name = str(judge).split(' - ')[1].split('_')[0]
        judge_surname = str(judge).split(' - ')[1].split('_')[1]
        v = Votation.objects.filter(fk_session=session_id,
                                    fk_couple=Couple.objects.get(fk_session=session_id, number=couple_number),
                                    fk_dance=Dance.objects.get(fk_session=session_id, name=dance),
                                    fk_judge=Judge.objects.get(name=judge_name, surname=judge_surname,
                                                               fk_session=session_id, id_login=judge_id_login))
        serializer = VoteSerializer(v, many=True)
        return Response(serializer.data)

    def post(self, request, session_id, couple_number, judge, dance):
        param = request.POST['param']
        vote = request.POST['vote']
        judge_id_login = str(judge).split(' - ')[0]
        judge_name = str(judge).split(' - ')[1].split('_')[0]
        judge_surname = str(judge).split(' - ')[1].split('_')[1]
        try:
            v1 = Votation.objects.filter(fk_session=DbSession.objects.get(id=session_id),
                                         fk_parameter=Paramether.objects.get(fk_session=session_id, name=param),
                                         fk_dance=Dance.objects.get(fk_session=session_id, name=dance),
                                         fk_judge=Judge.objects.get(fk_session=session_id, name=judge_name,
                                                                    surname=judge_surname, id_login=judge_id_login),
                                         fk_couple=Couple.objects.get(fk_session=session_id,
                                                                      number=couple_number))
            if v1:
                v1.update(vote=vote)
                return Response('Updated', 200)
            else:
                v = Votation(fk_session=DbSession.objects.get(id=session_id),
                             fk_parameter=Paramether.objects.get(fk_session=session_id, name=param),
                             fk_dance=Dance.objects.get(fk_session=session_id, name=dance),
                             fk_judge=Judge.objects.get(fk_session=session_id, name=judge_name,
                                                        surname=judge_surname, id_login=judge_id_login),
                             fk_couple=Couple.objects.get(fk_session=session_id,
                                                          number=couple_number),
                             vote=vote)
                v.save()
                return Response('Created', 200)
        except:
            v = Votation(fk_session=DbSession.objects.get(id=session_id),
                         fk_parameter=Paramether.objects.get(fk_session=session_id, name=param),
                         fk_dance=Dance.objects.get(fk_session=session_id, name=dance),
                         fk_judge=Judge.objects.get(fk_session=session_id, name=judge_name,
                                                    surname=judge_surname, id_login=judge_id_login),
                         fk_couple=Couple.objects.get(fk_session=session_id,
                                                      number=couple_number),
                         vote=vote)
            v.save()
            return Response('Created', 200)


class JudgeNotePerCoupleView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, session_id, couple_number, judge):
        judge_id_login = str(judge).split(' - ')[0]
        judge_name = str(judge).split(' - ')[1].split('_')[0]
        judge_surname = str(judge).split(' - ')[1].split('_')[1]
        n = Note.objects.filter(fk_session=session_id,
                                fk_couple=Couple.objects.get(fk_session=session_id, number=couple_number),
                                fk_judge=Judge.objects.get(name=judge_name, surname=judge_surname,
                                                           fk_session=session_id, id_login=judge_id_login))
        serializer = NoteSerializer(n, many=True)
        return Response(serializer.data)

    def post(self, request, session_id, couple_number, judge):
        dance = request.POST['dance']
        notes = request.POST['notes']
        judge_id_login = str(judge).split(' - ')[0]
        judge_name = str(judge).split(' - ')[1].split('_')[0]
        judge_surname = str(judge).split(' - ')[1].split('_')[1]
        try:
            n1 = Note.objects.filter(fk_session=DbSession.objects.get(id=session_id),
                                     fk_dance=Dance.objects.get(fk_session=session_id, name=dance),
                                     fk_judge=Judge.objects.get(fk_session=session_id, name=judge_name,
                                                                surname=judge_surname, id_login=judge_id_login),
                                     fk_couple=Couple.objects.get(fk_session=session_id,
                                                                  number=couple_number))
            if n1:
                n1.update(notes=notes)
                return Response('Updated', 200)
            else:
                n = Note(fk_session=DbSession.objects.get(id=session_id),
                         fk_dance=Dance.objects.get(fk_session=session_id, name=dance),
                         fk_judge=Judge.objects.get(fk_session=session_id, name=judge_name,
                                                    surname=judge_surname, id_login=judge_id_login),
                         fk_couple=Couple.objects.get(fk_session=session_id,
                                                      number=couple_number),
                         notes=notes)
                n.save()
                return Response('Created', 200)
        except:
            n = Note(fk_session=DbSession.objects.get(id=session_id),
                     fk_dance=Dance.objects.get(fk_session=session_id, name=dance),
                     fk_judge=Judge.objects.get(fk_session=session_id, name=judge_name,
                                                surname=judge_surname, id_login=judge_id_login),
                     fk_couple=Couple.objects.get(fk_session=session_id,
                                                  number=couple_number),
                     notes=notes)
            n.save()
            return Response('Created', 200)


class JudgeNotePerCouplePerDanceView(APIView):
    # permission_classes = (IsAuthenticated,)

    def get(self, request, session_id, couple_number, judge, dance):
        judge_id_login = str(judge).split(' - ')[0]
        judge_name = str(judge).split(' - ')[1].split('_')[0]
        judge_surname = str(judge).split(' - ')[1].split('_')[1]
        n = Note.objects.filter(fk_session=session_id,
                                fk_couple=Couple.objects.get(fk_session=session_id, number=couple_number),
                                fk_dance=Dance.objects.get(fk_session=session_id, name=dance),
                                fk_judge=Judge.objects.get(name=judge_name, surname=judge_surname,
                                                           fk_session=session_id, id_login=judge_id_login))
        serializer = NoteSerializer(n, many=True)
        return Response(serializer.data)

    def post(self, request, session_id, couple_number, judge, dance):
        notes = request.POST['notes']
        judge_id_login = str(judge).split(' - ')[0]
        judge_name = str(judge).split(' - ')[1].split('_')[0]
        judge_surname = str(judge).split(' - ')[1].split('_')[1]
        try:
            n1 = Note.objects.filter(fk_session=DbSession.objects.get(id=session_id),
                                     fk_dance=Dance.objects.get(fk_session=session_id, name=dance),
                                     fk_judge=Judge.objects.get(fk_session=session_id, name=judge_name,
                                                                surname=judge_surname, id_login=judge_id_login),
                                     fk_couple=Couple.objects.get(fk_session=session_id,
                                                                  number=couple_number))
            if n1:
                n1.update(notes=notes)
                return Response('Updated', 200)
            else:
                n = Note(fk_session=DbSession.objects.get(id=session_id),
                         fk_dance=Dance.objects.get(fk_session=session_id, name=dance),
                         fk_judge=Judge.objects.get(fk_session=session_id, name=judge_name,
                                                    surname=judge_surname, id_login=judge_id_login),
                         fk_couple=Couple.objects.get(fk_session=session_id,
                                                      number=couple_number),
                         notes=notes)
                n.save()
                return Response('Created', 200)
        except:
            n = Note(fk_session=DbSession.objects.get(id=session_id),
                     fk_dance=Dance.objects.get(fk_session=session_id, name=dance),
                     fk_judge=Judge.objects.get(fk_session=session_id, name=judge_name,
                                                surname=judge_surname, id_login=judge_id_login),
                     fk_couple=Couple.objects.get(fk_session=session_id,
                                                  number=couple_number),
                     notes=notes)
            n.save()
            return Response('Created', 200)


class DeleteAllVotationsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, session_id):
        v = Votation.objects.filter(fk_session=session_id).delete()
        return Response({"Deleted", 204})


class ShowAllVotationsPerCoupleView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, session_id, couple_number):
        v = Votation.objects.filter(fk_session=session_id,
                                    fk_couple=Couple.objects.get(fk_session=session_id, number=couple_number))
        serializer = VoteSerializer(v, many=True)
        return Response(serializer.data)


class JudgeVotePerCouplePerDancePerParamView(APIView):
    # permission_classes = (IsAuthenticated,)

    def get(self, request, session_id, couple_number, judge, dance, param):
        judge_id_login = str(judge).split(' - ')[0]
        judge_name = str(judge).split(' - ')[1].split('_')[0]
        judge_surname = str(judge).split(' - ')[1].split('_')[1]
        v = Votation.objects.filter(fk_session=session_id,
                                    fk_parameter=Paramether.objects.get(fk_session=session_id, name=param),
                                    fk_couple=Couple.objects.get(fk_session=session_id, number=couple_number),
                                    fk_dance=Dance.objects.get(fk_session=session_id, name=dance),
                                    fk_judge=Judge.objects.get(name=judge_name, surname=judge_surname,
                                                               fk_session=session_id, id_login=judge_id_login))
        serializer = VoteSerializer(v, many=True)
        return Response(serializer.data)

    # def post(self, request, session_id, couple_number, judge, dance):
    #     param = request.POST['param']
    #     vote = request.POST['vote']
    #     print(param, vote)
    #     judge_name = (str(judge).split('_')[0])
    #     judge_surname = (str(judge).split('_')[1])
    #     try:
    #         v1 = Votation.objects.filter(fk_session=DbSession.objects.get(id=session_id),
    #                                      fk_parameter=Paramether.objects.get(fk_session=session_id, name=param),
    #                                      fk_dance=Dance.objects.get(fk_session=session_id, name=dance),
    #                                      fk_judge=Judge.objects.get(fk_session=session_id, name=judge_name,
    #                                                                 surname=judge_surname),
    #                                      fk_couple=Couple.objects.get(fk_session=session_id,
    #                                                                   number=couple_number))
    #         if v1:
    #             v1.update(vote=vote)
    #             return Response('Updated', 200)
    #         else:
    #             v = Votation(fk_session=DbSession.objects.get(id=session_id),
    #                          fk_parameter=Paramether.objects.get(fk_session=session_id, name=param),
    #                          fk_dance=Dance.objects.get(fk_session=session_id, name=dance),
    #                          fk_judge=Judge.objects.get(fk_session=session_id, name=judge_name,
    #                                                     surname=judge_surname),
    #                          fk_couple=Couple.objects.get(fk_session=session_id,
    #                                                       number=couple_number),
    #                          vote=vote)
    #             v.save()
    #             return Response('Created', 200)
    #     except:
    #         v = Votation(fk_session=DbSession.objects.get(id=session_id),
    #                      fk_parameter=Paramether.objects.get(fk_session=session_id, name=param),
    #                      fk_dance=Dance.objects.get(fk_session=session_id, name=dance),
    #                      fk_judge=Judge.objects.get(fk_session=session_id, name=judge_name,
    #                                                 surname=judge_surname),
    #                      fk_couple=Couple.objects.get(fk_session=session_id,
    #                                                   number=couple_number),
    #                      vote=vote)
    #         v.save()
    #         return Response('Created', 200)
