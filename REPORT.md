# ToDoApp report

## Report - Luca Berger
Ich kannte das Framework Angular bereits, da ich im Geschäft auch damit Web-Apps programmiere. Dennoch konnte ich ein paar neue Aspekte kennenlernen.
Wie zum Beispiel die HttpInterceptor, Angular bietet da eine sehr einfach aber sehr mächtige Möglichkeit, in den “Ablauf” eines HttpRequest / HttpResponse einzugreifen.
Wir haben diese Interceptors verwendet, um das JWT-Token mitzusenden, wenn wir bereits autorisiert sind. Ausserdem haben wir noch einen HttpResponse Interceptor in die Pipeline eingefügt, um ein mögliches Ablaufen des JWT Token zu behandeln.  
Was mir persönlich am Framework Angular gefällt ist der Built-in Dependency Injection Mechanismus, welches das Unit Testen von Code massiv vereinfacht. In diesem Projekt wurde zwar bewusst auf Unit-Tests verzichtet.  
Desweiteren mag ich persönlich die gewisse Struktur, welche Angular einem aufzwingt. Hier werden die verschiedenen Typen von Klassen unterschieden, so gibt es, Components, Directives, Pipes, Templates & Services.
Durch diese Strukturierung lässt sich der Code besser organisieren.  
Was ich immer noch ein wenig speziell finde ist TypeScript. Ich mag zwar die Typen-Sicherheit sehr, jedoch finde ich die Syntax von TypeScript ein wenig gewöhnungsbedürftig, allerdings gewöhnt man sich mit der Zeit daran.  
Im Vergleich zur Vanilla JS App ist der Code relativ ähnlich aufgebaut, es gibt auch wieder einen Router der sich ums Rendern der richtigen View kümmert.
Die Daten werden logischerweise auch per HTTP-Request abgefragt/aktualisiert.

## Report - Christian Nussbaum 
Das Framework Angular hat mir gefallen, da es strukturiert und einem einiges an Arbeit abnehmen kann über die Angular CLI. Man merkt, dass dieses Framework für grössere Projekte gedacht ist, da es einzelne Pages komplett voneinander trennt und Grundfunktionen schon zur Verfügung stellt, wie zum Beispiel den Router.  
Der grösste Unterschied zu der im Unterricht erstellten “händischen” SPA liegt wohl darin, dass Angular mit TypeScript arbeitet. Dies ist zum bisherigen eine Umgewöhnung, aber man kommt schnell rein und ist im Endeffekt mehr eine Hilfe, als eine Bürde.  
Ein weiterer Unterschied ist das Arbeiten mit Observables an Stelle von Promises. Von der Grundidee sind sie gleich, jedoch haben Observables den Vorteil, dass sie “lazy” sind.
Die Observables haben wir hauptsächlich in den HTTP-Requests gebraucht. Bei diesen wird vom Framework eine Möglichkeit bereitgestellt, sogenannte “HttpInterceptors” zu programmieren. Diese können einen Request abfangen und bevor dieser empfangen oder gesendet wird, können noch zusätzliche Operationen gemacht werden wie beispielsweise beim Senden den Autorisierungstoken hinzufügen.  
Generell empfand ich Angular ein cooles Framework.


## Fazit
Vom Aufbau her sind die beiden Projekte einander ziemlich ähnlich. 
Wobei durch das Angular Framework einige Dinge vereinfacht werden, resp. einem schon mehr zur Verfügung stellt.  
Für kleinere Applikationen wie dieses Projekt, lohnt sich jedoch ein JS Framework noch nicht wirklich, weil durch das Framework viele zusätzliche Funtkionen dazukommen, welche nicht benutzt werden.  
Durch die Verwendung eines Frameworks zwingt man sich einen gewissen vorgegebenen Rahmen auf, hingegen ist man ohne Framework komplett frei, was allerdings auch zu einem "Wildwuchs" führen kann.  
Generell hatten wir bei der Verwendung von Angular Spass und würden es auch weiter verwenden.
