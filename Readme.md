# URslides

Die Anwendung [*URslides*](http://localhost:8701) ermöglicht Dozierenden der Universität eine nachträgliche Verbesserung oder Ergänzung ihrer Foliensätze - Kommentare in der Form von Text oder Audio können veröffentlicht und so den Studierenden zugänglich gemacht werden. 

<p align="center">
  <img alt="Screenshot der URslides Startseite" src="docs/img/urslides-startseite.PNG" width="600" align="middle"/>
</p>


## Team

| | Infos | Implementierte Komponenten
|-|-|-|
<img alt="Portrait von Stefan Braun" src="docs/img/stefan-braun.jpg" width="100" /> | **Stefan Braun**<br />E-Mail: stefan.braun@student.ur.de<br />Github-Nutzer: INazca | Stefan Braun hat die Komponente (...) implementiert. |
<img alt="Portrait von Isabella Kreller" src="docs/img/isabella-kreller.jpg" width="100" /> | **Isabella Kreller**<br />E-Mail: isabella.kreller@student.ur.de<br />Github-Nutzer: kallutox | Isabella Kreller hat die Komponente (...) implementiert. |


## Setup

So nutzen Sie den vorgegebenen Server:

1. Führen Sie **einmalig** den Befehl `npm install` aus, um die notwendigen Abhängigkeiten (`express`) zu installieren.

2. Führen Sie den Befehl `npm start` aus um die Anwendung zu starten. Der Inhalt des `/app`-Verzeichnis ist anschließend über die die Adresse `http://localhost:8701/app` erreichbar.

[Beschreiben Sie alle Schritte, die notwendig sind um Ihre Anwendung auf Basis dieses Repositories zu starten.]

## Beschreibung und Features

URslides bietet den Benutzern die folgenden **Funktionen**:
<br />

- Das Hochladen von Foliensätzen im pdf-Format und deren persistente Speicherung in einer Datenbank

<p align="center">
  <img alt="Screenshot des Uploads" src="docs/img/urslides-upload.PNG" width="400" align="middle"/>
</p>
<br />

- Eine Ansicht für die Betrachtung der Foliensätze und das Durchblättern durch diese

<p align="center">
  <img alt="Screenshot des PDF Viewers" src="docs/img/urslides-view.PNG" width="400" align="middle"/>
</p>
<br />

- Das Ändern und Speichern des Dateinames in der Anwendung

<p align="center">
  <img alt="Screenshot des bearbeiteten PDF-Namen" src="docs/img/urslides-pdfName.png" width="300" align="middle"/>
</p>
<br />

- Die Erstellung von Kommentaren zu einzelnen Seiten seiner eigenen Foliensätze im Anschluss an dessen Upload
  - Textkommentare
  
  <p align="center">
    <img alt="Screenshot eines Textkommentars" src="docs/img/urslides-textcomment.PNG" width="400" align="middle"/>
  </p>
  <br />

  - Audiokommentare: Upload oder direkte Aufnahme
  
  <p align="center">
    <img alt="Screenshot eines Audikommentars" src="docs/img/urslides-audiocomment.PNG" width="400" align="middle"/>
  </p>
  <br />

- Das Durchsuchen aller hochgeladenen Foliensätze anhand deren Namen

  <p align="center">
   <img alt="Screenshot der Suche" src="docs/img/urslides-search.PNG" width="400" align="middle"/>
  </p>
  <br />

[Dokumentieren Sie ausführlich alle Funktionen der Anwendung. Verwenden Sie Screenshots und ggf. auch Gif-Dateien um zentrale Elemente und Abläufe zu beschreiben.]
