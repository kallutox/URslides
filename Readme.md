# URslides

Die Anwendung *URslides* ermöglicht Dozierenden der Universität eine nachträgliche Verbesserung oder Ergänzung ihrer Foliensätze - Kommentare in der Form von Text, Audio oder Video können veröffentlicht und so den Studierenden zugänglich gemacht werden. 

(Screenshot + Link to be added)

## Team

| | Infos | Implementierte Komponenten
|-|-|-|
<img alt="Portrait von Stefan Braun" src="docs/img/stefan-braun.jpg" width="100" /> | **Stefan Braun**<br />E-Mail: stefan.braun@student.ur.de<br />Github-Nutzer: INazca | Stefan Braun hat die Komponente (...) implementiert. |
<img alt="Portrait von Isabella Kreller" src="docs/img/isabella-kreller.jpg" width="100" /> | **Isabella Kreller**<br />E-Mail: isabella.kreller@student.ur.de<br />Github-Nutzer: kallutox | Isabella Kreller hat die Komponente (...) implementiert. |


## Setup

Im Starterpaket ist ein einfacher Webserver vorgegeben, mit dem Sie die Inhalte des Ordners `/app` statisch ausliefern können. Benutzen Sie diesen, um Ihre Anwendung zu entwickeln und zu testen. Sollten Sie zu Realisierung Ihrer Anwendung eine komplexere Serverkomponente benötigen, können Sie die vorhandenen Dateien (`index.js` und `lib/AppServer.js`) als Ausgangslage für eigene Erweiterungen nutzten. Speichern Sie alle weiteren, serverseitig verwendeten Dateien im Verzeichnis `/lib` ab.

So nutzen Sie den vorgegebenen Server:

1. Führen Sie **einmalig** den Befehl `npm install` aus, um die notwendigen Abhängigkeiten (`express`) zu installieren.

2. Führen Sie den Befehl `npm start` aus um die Anwendung zu starten. Der Inhalt des `/app`-Verzeichnis ist anschließend über die die Adresse `http://localhost:8701/app` erreichbar.

[Beschreiben Sie alle Schritte, die notwendig sind um Ihre Anwendung auf Basis dieses Repositories zu starten.]

## Beschreibung

[Screenshots + Formatierung folgen]

URslides bietet den Benutzern die folgenden Funktionen:

- Das Hochladen von Foliensätzen im pdf-Format und deren persistente Speicherung in einer Datenbank
- Eine Ansicht für die Betrachtung der Foliensätze und das Durchblättern durch diese
- Das Ändern und Speichern des Dateinames in der Awendung
- Die Erstellung von Kommentaren zu einzelnen Seiten seiner eigenen Foliensätze im Anschluss an dessen Upload
  - Textkommentare
  - Audiokommentare: Upload oder direkte Aufnahme
  - Videokommentare: Upload oder direkte Aufnahme
- Das Durchsuchen aller hochgeladenen Foliensätze anhand deren Namen


[Dokumentieren Sie ausführlich alle Funktionen der Anwendung. Verwenden Sie Screenshots und ggf. auch Gif-Dateien um zentrale Elemente und Abläufe zu beschreiben.]
