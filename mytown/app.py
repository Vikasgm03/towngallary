from flask import Flask, render_template, request, redirect, url_for
import os
import sqlite3
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads'

# Ensure upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# ---------- Database Setup ----------
def init_db():
    with sqlite3.connect('database.db') as conn:
        c = conn.cursor()
        c.execute('''CREATE TABLE IF NOT EXISTS posts (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        title TEXT,
                        description TEXT,
                        image_filename TEXT,
                        location TEXT
                    )''')
        conn.commit()

init_db()

# ---------- Routes ----------

@app.route('/')
def index():
    with sqlite3.connect('database.db') as conn:
        c = conn.cursor()
        c.execute("SELECT * FROM posts ORDER BY id DESC")
        posts = c.fetchall()
    return render_template('index.html', posts=posts)

@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        location = request.form['location']
        image = request.files['image']

        if image:
            filename = secure_filename(image.filename)
            image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            with sqlite3.connect('database.db') as conn:
                c = conn.cursor()
                c.execute("INSERT INTO posts (title, description, image_filename, location) VALUES (?, ?, ?, ?)",
                          (title, description, filename, location))
                conn.commit()
            return redirect(url_for('index'))

    return render_template('upload.html')

@app.route('/post/<int:post_id>')
def post(post_id):
    with sqlite3.connect('database.db') as conn:
        c = conn.cursor()
        c.execute("SELECT * FROM posts WHERE id=?", (post_id,))
        post = c.fetchone()
    return render_template('post.html', post=post)

if __name__ == '__main__':
    app.run(debug=True)
