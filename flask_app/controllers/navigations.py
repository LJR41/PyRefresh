import requests
import json
import os
from flask_app import app
from flask import jsonify
from flask import render_template,redirect,request,session,flash

URL = "https://www.dnd5eapi.co/api/"


@app.route('/')          # The "@" decorator associates this route with the function immediately following
def home_page():
    response = requests.get(f"{URL}rules/")
    if response.status_code == 200:
        rules_info = json.loads(response.content)
        print(rules_info) 
        return render_template('index.html', rules_info=rules_info)
    else:
        print(f"Error: {response.status_code}")
        return render_template('index.html')  # Return the string 'Hello World!' as a response


@app.route('/race/view', methods=['POST'] )
def get_race():
    data= {
        **request.form,
    }
    print(data['race'])
    response = requests.get(f"{URL}races/{data['race']}")
    if response.status_code == 200:
        race_info = json.loads(response.content)
        print(race_info) 
        return render_template('one_race.html', data=race_info)
    else:
        print(f"Error: {response.status_code}")
    return redirect('/')   

@app.route('/ability/view', methods=['POST'] )
def get_class():
    data= {
        **request.form,
    }
    print(data['ability'])
    response = requests.get(f"{URL}ability-scores/{data['ability']}")
    if response.status_code == 200:
        ability_info = json.loads(response.content)
        # print(ability_info) 
        return render_template('one_ability.html', data=ability_info)
    else:
        print(f"Error: {response.status_code}")
    return redirect('/')

@app.route('/skill/view/<skill>')
def get_skill(skill):
    response = requests.get(f"{URL}skills/{skill}")
    if response.status_code == 200:
        skill_info = json.loads(response.content)
        # print(skill_info) 
        return skill_info
    else:
        print(f"Error: {response.status_code}")
    return redirect('/')

@app.route('/trait/view/<trait>')
def get_trait(trait):
    print(trait)
    response = requests.get(f"{URL}traits/{trait}")
    if response.status_code == 200:
        trait_info = json.loads(response.content)
        # print(trait_info) 
        return trait_info
    else:
        print(f"Error: {response.status_code}")
    return redirect('/')

@app.route('/rule/view/<rule>')
def get_rule(rule):
    print(rule)
    response = requests.get(f"{URL}rules/{rule}")
    if response.status_code == 200:
        rule_info = json.loads(response.content)
        # print(rule_info) 
        return rule_info
    else:
        print(f"Error: {response.status_code}")
    return redirect('/')

@app.route('/popover/view/<rule>')
def get_popover(rule):
    print(rule)
    response = requests.get(f"{URL}rule-sections/{rule}")
    if response.status_code == 200:
        popover_info = json.loads(response.content)
        # print(popover_info) 
        return popover_info
    else:
        print(f"Error: {response.status_code}")
    return redirect('/')

@app.route('/onerule/view/<rule>')
def show_rule(rule):
    print(rule)
    return render_template('one_rule.html', rule=rule)