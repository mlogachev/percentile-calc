#!flask/bin/python3.5

from lib.decorators import nocache
from flask import Flask, render_template, send_file
import scipy.stats as stat

app = Flask(__name__)


@app.route('/')
@nocache
def index():
    app.logger.warning('res: index.html')
    return send_file('static/index.html')


@app.route('/static/<string:file_name>')
@nocache
def render_static(file_name):
    # return app.send_static_file(file_name)
    # print(file_name)
    # print('static/' + file_name)

    app.logger.error(file_name)
    app.logger.error('static/' + file_name)
    return send_file('static/' + file_name)


@app.route('/api/norm/<string:quantile>', methods=['GET'])
def q_norm(quantile):
    # app.logger.warning(stat.norm.ppf(1))
    return str(stat.norm.ppf(float(quantile)))

@app.route('/api/student/<string:quantile>/<string:st>', methods=['GET'])
def q_student(quantile, st):
    return str(stat.t.ppf(float(quantile), int(st)))

@app.route('/api/hi/<string:quantile>/<string:st>', methods=['GET'])
def q_hi(quantile, st):
    return str(stat.chi2.ppf(float(quantile), int(st)))

@app.route('/api/fisher/<string:quantile>/<string:st1>/<string:st2>', methods=['GET'])
def q_fisher(quantile, st1, st2):
    return str(stat.f.ppf(float(quantile), int(st1), int(st2)))

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
    print(app.url_map)