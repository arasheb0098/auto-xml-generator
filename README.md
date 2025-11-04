<h1 align="center">🎬 Auto XML Chapter Generator Web App</h1>

<p align="center">
A <b>User-Friendly Laravel-Based App</b> That Automatically Generates <b>XML Chapter Files</b> For Videos Like <code>.MKV</code>, <code>.MP4</code> & More...
<br>
Easily Split Your Movie Into Chapters, Name Them, And Export A Clean, Ready-To-Use <b>.XML</b> File
<br>
<b>— All With Just A Few Clicks! —</b>
</p>

<hr/>

<h2>📸 SCREENSHOT</h2>

<div align="center">
<img src="public/screenshot.png" alt="Auto XML Chapter Generator" alt="Auto XML Generator App" title="Auto XML Generator App">
</div>

<hr/>

<h2>🚀 FEATURES</h2>

<ul>
<li>✅ <b>Drag & Drop Upload</b> — Simply Drop Your Video File Into The Upload Box Or Select It Manually</li>
<li>✅ <b>Automatic Video Info Detection</b> — Instantly View File Name, Format & Total Duration <b>(HH:MM:SS)</b></li>
<li>✅ <b>Smart Input Fields</b> — Fully Guided & Prefilled Options To Make Setup Effortless</li>
<li>✅ <b>AI-Powered File Naming</b> — Automatically Fetch The Movie Name Using AI <b>(OPTIONAL)</b></li>
<li>✅ <b>Instant XML Generation</b> — Generate & Download Your Final XML File In One Click</li>
<li>✅ <b>Reset Button</b> — Reset All Inputs To Their Default Values Instantly</li>
<li>✅ <b>Multi-Language Support</b> — Select A Language & The App Automatically Fills Both 2/3-Letter Codes Tags</li>
</ul>

<hr/>

<h2>⚙️ INPUT OPTIONS EXPLAINED</h2>

<div align="center">
<table>
<tr align="center"><th>FIELD</th><th>DESCRIPTION</th><th>DEFAULT</th></tr>
<tr><td align="left">⚪ <b>Split Every</b></td><td align="center">Determines The Max Time (Minutes) Per Chapter<br>(Includes <code>+5</code> / <code>-5</code> Minute Controls)</td><td align="center"><b>10</b></td></tr>
<tr><td align="left">⚪ <b>Chapter</b></td><td align="center">Base Name For Each Chapter<br>(Like <code>Chapter 1</code>, <code>Chapter 2</code>...)</td><td align="center"><b>Chapter</b></td></tr>
<tr><td align="left">⚪ <b>Language</b></td><td align="center">Auto-Fills Chapter Language<br>(Fill <code>ChapterLanguage</code> With 3-LETTER/2-LETTER)</td><td align="center"><b>English</b></td></tr>
<tr><td align="left">⚪ <b>File Name</b></td><td align="center">Output XML File Name<br>(Use <code>AI</code> To Auto-Detect Movie Title)</td><td align="center"><b>CHAPTERS</b><code>.XML</code></td></tr>
</table>
</div>

<hr/>

<details>
<summary align="center"><b>🧭 The Project Structure: (Click To Expand)</b></summary><br>

```
📁app/
│   ├── 📁Http/
│   │   └── 📁Controllers/
│	│	│   ├── 📄Controller.php
│	│	│   └── 📄MainController.php
│   │   └── 📁Middleware/
│   ├── 📁Models/
│   └── 📁Providers/
│
📁bootstrap/
│   ├── 📄app.php
│   └── 📄providers.php
│
📁config/
│   ├── 📄app.php
│   ├── 📄database.php
│   ├── 📄services.php
│   └── 📄session.php
│
📁database/
│   ├── 📁factories/
│   ├── 📁migrations/
│   └── 📁seeders/
│
📁public/
│   ├── 📁files/
│   └── 📄index.php
│
📁resources/
│   ├── 📁css/
│   ├── 📁js/
│   ├── 📁views/
│   │   └── 📁content/
│	│	│   ├── 📄header.blade.php
│	│	│   └── 📄footer.blade.php
│   │   └── 📄index.blade.php
📁routes/
│   ├── 📄web.php
│   └── 📄api.php
│
📁storage/
│   ├── 📁app/
│   ├── 📁framework/
│   └── 📁logs/
│
📁tests/
│   ├── 📁Feature/
│   └── 📁Unit/
│
📄.env
📄artisan
📄composer.json
📄package.json
📄vite.config.js
```
</details>

<hr/>

<details>
<summary align="center"><b>🧠 How This App Works (Click To Expand)</b></summary><br>

🔴 1. <b>Upload</b> OR <b>Drag/Drop</b> Your Video File Into The Drop Box<br>
🔴 2. The App <b>Extract MetaData</b> (Like Size, Duration & Format)<br>
🔴 3. Fill In OR Adjust The <b>Input Fields</b> (Split Every, Chapter, Language & File Name)<br>
🔴 4. Click <b>GENERATE!</b> To Instantly Get Your <b>.XML</b> Chapter's File<br>
🔴 5. Optionally, You Can Use Button <b>RESET</b> To Restore Defaults
</details>

<hr/>

<details>
<summary align="center"><b>🖥 Example Output XML (Click To Expand)</b></summary><br>

🔴 1. Upload Your Video File First<br>
🔴 2. Adjust Split Every (E.G, 15 Minutes)<br>
🔴 3. Enter Chapter Name (E.G, Sections)<br>
🔴 4. Choose A Language (English, OR Any Available Option)<br>
🔴 5. Click <b>GENERATE!</b> & Your XML File Downloads Instantly!
<br>
<blockquote>
🖥 Output Example:
</blockquote>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Chapters>
	<EditionEntry>
		<ChapterAtom>
			<ChapterUID>57641337672620021982</ChapterUID>
			<ChapterTimeStart>00:00:00.000000000</ChapterTimeStart>
			<ChapterFlagHidden>0</ChapterFlagHidden>
			<ChapterFlagEnabled>1</ChapterFlagEnabled>
			<ChapterTimeEnd>00:10:00.000000000</ChapterTimeEnd>
			<ChapterDisplay>
				<ChapterString>Chapter 01</ChapterString>
				<ChapterLanguage>eng</ChapterLanguage>
				<ChapLanguageIETF>en</ChapLanguageIETF>
			</ChapterDisplay>
		</ChapterAtom>
		<ChapterAtom>
			<ChapterUID>32621627395920423965</ChapterUID>
			<ChapterTimeStart>00:10:00.000000000</ChapterTimeStart>
			<ChapterFlagHidden>0</ChapterFlagHidden>
			<ChapterFlagEnabled>1</ChapterFlagEnabled>
			<ChapterTimeEnd>00:20:00.000000000</ChapterTimeEnd>
			<ChapterDisplay>
				<ChapterString>Chapter 02</ChapterString>
				<ChapterLanguage>eng</ChapterLanguage>
				<ChapLanguageIETF>en</ChapLanguageIETF>
			</ChapterDisplay>
		</ChapterAtom>
	</EditionEntry>
</Chapters>
```
</details>

<hr/>

<details>
<summary align="center"><b>🛠 Full Installation Guide (Click To Expand)</b></summary><br>

<li>Run The Following Commands :</li><br>
<pre>
git clone https://github.com/arasheb0098/auto-xml-generator.git
cd auto-xml-generator
composer install
npm install && npm run dev
</pre>

<li> Update The <code>.ENV</code> With Your Local Database Settings. (Also You Can Set Your <b>AI API</b> Settings Here)</li>

<li>Then Open Your LocalHost. <code>HTTP://LOCALHOST:8000</code></li><br>

<blockquote>
✅ DONE!<br>
❌ Just Remember That If You Encounter A <b>500 Error</b> In Laravel, It Might Be Due To The Missing <b>.ENV</b> File!<br>
You Can Create This File By Renaming The <b>.ENV.EXAMPLE</b> File To <b>.ENV</b> And Running The Command:<br>
</blockquote>
<pre>
cp .env.example .env
php artisan key:generate
</pre>
</details>

<hr/>

<h2>💡 TECH STACK</h2>

<ul>
<li>⚙️ <b>Laravel 12.36.1</b> <code>LATEST</code> — Backend Framework</li>
<li>🎨 <b>Bootstrap 5.3.8</b> <code>LATEST</code> — UI Styling</li>
<li>🧩 <b>Vanilla JavaScript + JQUERY 3.7.1</b> <code>LATEST</code> — Dynamic UI Behavior</li>
<li>🤖 <b>AI Integration By GPT-4O</b> <code>LATEST</code> — For Output File Name Auto-Detection</li>
</ul>

<hr/>

<h2>🔄 UPDATE GUIDE</h2>

You Can Easily Update This Project To The <b>LATEST Version Of Laravel</b>!<br>
Just Follow These Simple Steps:

🔴 1. <b>Install</b> A Fresh, Untouched & Complete Copy Of The <b>LATEST Laravel Version</b><br>
🔴 2. Then, <b>Copy</b> The Following Files & Folders From This Project, And <b>Paste</b> (& <b>Replace</b>) Them Inside Your New Laravel Folder<br>

```
├── 📁app/
│   └── 📁Http/
│       └── 📁Controllers/
│           └── 📄MainController.php
├── 📁config/
│   └── 📄services.php
├── 📁public/
│   └── files/
├── 📁resources/
│   └── 📁views/
├── 📁routes/
│   └── 📄web.php
├── 📄.env
└── 📄.htaccess
```

<blockquote>
✅ DONE!
<br>
— Yes, As Simple As That!
</blockquote>

<hr/>

<h2>📜 LICENSE</h2>
<p>This Project Is Licensed Under The <b>MIT License</b>.<br>Feel Free To Use, Modify & Share It Freely With Proper Credit.</p>

<hr/>

<h2>📝‍ AUTHOR</h2>

<p>
By : <b>ArAsH</b><br>
<blockquote>
🔗 <a href="https://github.com/arasheb0098">My GitHub!</a><br>
🔗 <a href="https://github.com/arasheb0098/auto-xml-generator">GitHub Link</a><br>
</blockquote>
</p>

<hr/>

<h2>⭐ SUPPORT</h2>

<p>If You Find This Project Helpful, Please <b>Give It A STAR ⭐ On GitHub</b> (It Really Helps & Means A Lot To Me! 💖)</p>

<blockquote>
“Simple Tools Make Complex Tasks Easy!”<br>
— <i>Auto XML Generator Web App</i>
</blockquote>