# URslides

Die Anwendung *URslides* ermöglicht Dozierenden der Universität eine nachträgliche Verbesserung oder Ergänzung ihrer Foliensätze - Kommentare in der Form von Text oder Audio können veröffentlicht und so den Studierenden zugänglich gemacht werden. 

<p align="center">
  <img alt="Screenshot der URslides Startseite" src="docs/img/urslides-startseite.PNG" width="600" align="middle"/>
</p>


## Team

| | Infos | Implementierte Komponenten
|-|-|-|
<img alt="Portrait von Stefan Braun" src="docs/img/stefan-braun.jpg" width="350"  /> | **Stefan Braun**<br />E-Mail: stefan.braun@student.ur.de<br />Github-Nutzer: INazca | Stefan Braun übernahm den Großteil der Programmierung und Getstaltung die Anwendung, und implementierte die Funktionen wie den Upload der Foliensätze, deren Anzeige, Suche sowie die Erstellug von Kommentaren in als Text oder Audio. |
<img alt="Portrait von Isabella Kreller" src="docs/img/isabella-kreller.jpg" width="350" /> | **Isabella Kreller**<br />E-Mail: isabella.kreller@student.ur.de<br />Github-Nutzer: kallutox | Isabella Kreller war für die Änderung des Foliensatznamens zuständig. Sie hat an Teilen der Gestaltung mitgewirkt und Buttons für Funktionalitäten erstellt. Die Dokumentation der Projektarbeit ist auch ihre Aufgabe gewesen. |


## Setup

So nutzen Sie den vorgegebenen Server:

1. Führen Sie **einmalig** den Befehl `npm install` aus, um die notwendigen Abhängigkeiten (`express`) zu installieren.

2. Führen Sie den Befehl `npm start` aus um die Anwendung zu starten. Der Inhalt des `/app`-Verzeichnis ist anschließend über die die Adresse `http://localhost:8701/app` erreichbar.

[Beschreiben Sie alle Schritte, die notwendig sind um Ihre Anwendung auf Basis dieses Repositories zu starten.]

## Beschreibung

*URslides* ist eine Anwendung, deren Zielgruppe primär Dozierende der Universität Regensburg sind. Diese können hier die Foleinsätze für ihre Vorlesungen vom ihrem Computer hochladen und für andere Nutzer, insbesondere Studierende, einsehbar machen. Sie haben dabei nach dem Upload die Option den Namen des Foliensatzes zu bearbeiten und Kommentare zu den einzelnen Folien der PDF-Datei zu erstellen. Die unterstützen Formate für Kommentare sind Text und Audiodateien. Audiodateien können hierbei erneut hochgeladen, oder alternativ auch direkt aus der Anwendung aufgenommen werden, bei Textkommentaren bietet sich die Möglichkeit diese nachträglich zu bearbeiten. Alle Arten von Kommentaren können zudem gelöscht werden.
Ist der Benutzer zufrieden mit der kommentierten Version seines Foliensatzes, kann er dieses mit einem Klick veröffentlichen, sodass es für andere Nutzer einsehbar wird. Nach der Veröffentlichung ist keine weitere Bearbeitung mehr möglich.

## Features
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

