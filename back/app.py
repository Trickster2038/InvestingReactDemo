from flask import Flask
import investpy
import json

app = Flask(__name__)

@app.route("/search/<name>")
def search(name):
    search_result = investpy.search_quotes(text=name, products=['stocks'],
                                       countries=['united states'], n_results=10)
    a = []
    for x in search_result:
        a.append(json.loads(str(x)))
    json1 = {'stocks':a}
    # return json.dumps(json1, indent=4)
    return json1

if __name__ == '__main__':
    app.run()