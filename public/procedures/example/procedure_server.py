import cherrypy
from step import Step
from field import Field
from itertools import chain


class ProcedureServer(object):
    def __init__(self):
        self.name = ""
        if self.define:
            self.define()

    def start(self):
        cherrypy.quickstart(self)

    def step(self, name):
        step = Step(name)
        return step

    @cherrypy.expose
    @cherrypy.tools.json_out()
    def index(self):
        return {
            'message': 'OK'
        }

    @cherrypy.expose
    def exit(self):
        cherrypy.engine.exit()

    @cherrypy.expose
    @cherrypy.tools.json_out()
    def procedureApi(self, id=None):
        return {
            'id': 0,
            'name': self.name,
            'stepsCount': len(Step.all),
            'steps': [step.id for step in Step.all]
        }

    @cherrypy.expose
    @cherrypy.tools.json_out()
    def stepApi(self, id=None):
        try:
            id = int(id)
        except:
            pass

        if id is None:
            return [step.json() for step in Step.all]
        elif id in range(len(Step.all)):
            return Step.all[id].json()
        else:
            return {
                'error': 'Unable to locate step'
            }

    @cherrypy.expose
    @cherrypy.tools.json_out()
    def fieldApi(self, id=None):
        try:
            id = int(id)
        except:
            pass

        if id is None:
            return [field.json() for field in Field.all]
        elif id in range(len(Field.all)):
            return Field.all[id].json()
        else:
            return {
                'error': 'Unable to locate step'
            }
