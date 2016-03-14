import cherrypy
from step import Step
from field import Field
from itertools import chain


class ProcedureServer(object):
    def __init__(self):
        self.stepsList = []
        self.name = ""
        if self.define:
            self.define()

    def start(self):
        cherrypy.quickstart(self)

    def step(self, name):
        step = Step(len(self.stepsList), name)
        self.stepsList.append(step)
        return step

    @cherrypy.expose
    @cherrypy.tools.json_out()
    def index(self):
        return {
            'id': 0,
            'name': self.name,
            'stepsCount': len(self.stepsList)
        }

    @cherrypy.expose
    def exit(self):
        cherrypy.engine.exit()

    @cherrypy.expose
    @cherrypy.tools.json_out()
    def steps(self, order=None):
        try:
            order = int(order)
        except:
            pass

        if order is None:
            return [step.json() for step in self.stepsList]
        elif order in range(len(self.stepsList)):
            return self.stepsList[order].json()
        else:
            return {
                'error': 'Unable to locate step'
            }

    @cherrypy.expose
    @cherrypy.tools.json_out()
    def fields(self, id=None):
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
