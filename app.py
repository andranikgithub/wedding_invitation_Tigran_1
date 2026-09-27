from flask import Flask, render_template, Response


app = Flask(__name__)


# =========================================================
# HOME
# =========================================================

@app.route("/")
def home():
    return render_template("index.html")


# =========================================================
# ROBOTS.TXT
# Allow search engines and Meta/Facebook crawler
# =========================================================

@app.route("/robots.txt")
def robots_txt():

    robots = """User-agent: *
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: Facebot
Allow: /
"""

    return Response(
        robots,
        mimetype="text/plain"
    )


# =========================================================
# RUN
# =========================================================

if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )
