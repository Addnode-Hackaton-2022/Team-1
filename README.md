# Uppstart

Hej och välkommen till detta Hackathon! I denna readme har vi samlat den information som ni ska behöva för att tackla det praktiskt runt uppgiften.
Agendan för dessa dagar finns i ett dokument som heter Agenda.pptx.
Ni som team jobbar i detta repo under denna tid. Vi i PL gruppen kommer att titta i repot under dagarnas gång och även kolla i det när vi ska utvärdera vinnarna det är därför viktigt att allt arbete sker här så att allt är på samma plats.

Ett tips till teamet är att gå varvet runt och låta alla presentera sig, ni kan utgå från detta ifall ni vill:

- Vem är du?
- Vad heter du?
- Vart jobbar du och vad jobbar du med?
- Vad har du gjort innan din nuvarande anställning?
- Vilka tekniker jobbar du mest med idag?
- Är det något under dessa dagar som du redan nu vet att du skulle vilja undersöka mera?

# För att klona repo

Github har tagit bort stödet för användarnamn och lösenord över HTTPS så ni behöver skapa ett PersonalAccessToken(PAT).
Gå in under Settings i rullisten uppe i högra hörnet på eran profil. Längst ner i Settings listan finns Developer Settings, klicka på den. Klicka sedan på Personal acces tokens. Klicka sedan på Generate new token. Ge ditt token ett namn och bocka för repo kryssrutan.
Detta skapar ett token med korrekt OAuth scope och du kan nu klona repot genom att tex köra: git clone https://< token >@github.com/Addnode-Hackaton-2022/Team-3.git

### Första uppgifterna till teamet, deadline dag 1 kl 11:00. Svara direkt i denna readme i punkterna under.

- Gå igenom pp Agenda.pptx
- Gå varvet runt och presentera era enligt frågorna ovan.
- Välj en teamleader för erat team.
  - Teamleader - Linus Mörtzell
- Välj ett namn för erat team. Detta skall även skrivas på dörren.
  - Namn - Soppatorsk
- Vilken utmaning jobbar ni med?
  - Namn - Uppkopplad båt

### Andra uppgiften, deadline dag 2 kl 12:30

- Ett inskick där ni ska fylla på denna readme med information under avsnittet Inskick, deadline dag två kl 13:00
- En muntlig presentation där ni får presentera eran uppgift.
- Lösningen som ni jobbat på under dessa dagar.

Det är på dessa moment som eran uppgift blir bedömd.

### Vad händer efter hackatonet?

En vecka efter hackatonet kommer alla repon att göras publika.

# Viktiga tider

### Dag 1 kl 11:00 - Deadline uppstart

### Dag 1 kl 12:00 - Lunch

### Dag 1 kl 18:30 - Middag

### Dag 2 kl 08:00 - Uppsamling H4, dagen startar

### Dag 2 kl 11:00 - Lunch

### Dag 2 kl 12:30 - Deadline för uppgiften.

Här skall sista commiten till repot vara gjord och den muntliga presentationen vara klar för redovisning.

### Dag 2 kl 15:00 - Hackaton avslutas med mingel för de som har möjlighet

# Inskick, deadline dag två kl 12:30

### Övergripande beskrivning och val av utmaning

Fjärrstyra uppkopplade båtar samt övervaka deras status. 

### Team

#### Namn på medlemmar

- Marcus Alvén
- Peter Fröberg
- Jonathan Jonsson
- Niklas Kling
- Linus Mörtzell
- Mikael Stalvik
- Lars Svensson

#### Hur har ni jobbat inom teamet? Har alla gjort samma eller har ni haft olika roller?

Den första delen löstes gemensamt av gruppen där vi reverse-engineerade formatet på paketen som WDU:n skickar via websockets.

Därefter tog vi fram en arkitektur design tillsammans på hur lösningen skall byggas (se PPT).

Utifrån arkitekturen delade vi på oss i följande grupper:
- WDU klient (JavaScript, Rasberry PI)
- Simulatorer (Java, C#)
- Cloud API (.NET6, C#, Azure)
- Monitor dashboard (React, TypeScript)


### Teknik. Beskrivningen på eran teknikstack, språk och APIer ni har använt.

Se ovan och PPT.

### Lösning, dessa frågor ska minst besvaras

- Hur har ni löst utmaningen?
   - Se PPT och runtime exempel.

- Hur långt har ni kommit?
   - Fungerande POC, skalbar och utbyggningsbar.

- Vad är nästa steg?
   - Deploya och testa lösning till en RasberryPi på en faktisk båt.
   - Aktivera flera "kanaler" och anpassa monitor verktyget att visuallisera mer data.
   - Slå på CORS på backend. Lägg på autentisering, slå av Swagger och "säkra" backend lösningen.
   - Persistera data i Cloud lösningen i en databas. Idag hålls bara data i minnet.


- Några rekommendationer för framtiden?
   - Hämta aktuell data från WDU vid uppstart alternativt alltid titta på aktuell information istället för endast uppdateringar.
   - Parsa JSON exportfil med kanalinformation och skapa ett verktyg för att mappa det enklare mot en klient.

- Några insikter, begränsningar eller utmaningar ni stött på som är intressanta att dela med der av?
  -  Brist på dokumentation om vilken data som skickas via WebSockets.


# Mall för muntlig presentation, deadline dag två kl 12:30

Den totala tiden av presentation får ni distribuera som ni vill men den måste hållas. Presentation i form av text skall vara i en powerpoint medans demo visar ni som ni vill. Tänk bara på att ni ska hinna på utsatt tid.

- Överblick och utmaning - 1min
  - En mening ang vad lösningen gör
  - Vilken utmaning har ni tacklat?
- Team - 1min
  - Vilka är ni i erat team?
  - Vilka roller har ni haft? Hur har ni jobbat tillsammans?
- Teknik - 1min
  - Vilka tekniker har ni använt?
- Lösning och Demo - 2min 30s
  - Demo
  - Hur löser ni denna utmaning?
  - Vad är nästa steg, rekommendationer för framtiden?

# Cloud Server med Swagger 

https://ssrswebapi20220824153938.azurewebsites.net/swagger/index.html

# Monitor tool
https://ambitious-flower-010394b03.1.azurestaticapps.net/
