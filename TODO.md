
// ON GOING
// TODO pocisti kodo
// TODO Odpravi vse type errorje

// TODO probaj uporabit defaultValue v inputih
// TODO v modal dodaj windown name in opens name
// TODO refactor modal toggle (skrajsaj logiko z ||)
// TODO dodaj toast za uspesen update act
// TODO dodaj inputs type checking
// TODO dodaj funkcijo: act comments (rabim dodat novo okno zaradi prostora)
// TODO dodaj potrditev za reset Better scora
// TODO popravi toaste za dodajanje in brisanje dnevov. prej so bili vezani na reactQuery
// TODO ce je missed day, zbrisi temp data za current day, ker ostane od zadnjic
// TODO naredi gumb za komment kot toggle
// TODO ENV LOCAL!!!!
// TODO 
// TODO 
// TODO 
// TODO 


// DONE
// TODO naredi prompt za plan, ce se ni
// TODO input field dodaj placeholderje, ko kliknes input lahko takoj pises brez brisanja 0
// TODO popravi funkicjo za chekiranje missed days
// TODO bug: saveDay funkicja narobe izracuna better points
// TODO dodaj v dayHeader koliko je bila tisti dan sprememba betterScore
// TODO bug: ko shranis dan se ne zbrise/zapre belezka okno
// TODO dodaj streak tudi za untouched
// TODO bug: none ne deluje, scora kot attempted 0.1 namesto 0.0
// TODO crash: ko shranimo dan z nekaj completed acti, crasha, socre: NaN
// TODO bug: kalkuliranje better scora je totalno pomesano
// TODO dodaj visino pomembnosti aktivnosti za Better Score (High, Low, None) default = High
// TODO bug: ko so mankajoci dnevi, better odsteje epoch tock
// TODO bug: ko shranis dan, se ne ponastavi belezka input state
// TODO bug: napacno dolocanje streakov
// TODO v dayObject sinhroniziraj ime inputMode z mode. Kateri je boljsi ime
// TODO bug: narobede dodeli actState za select tile
// TODO dodaj date format za berlezko in plan
// TODO spremeni kako tile doloci barvo
// TODO bug: ko imamo missingDays, se ob vsakem refresu dodajo minus score 
// TODO dodaj date-fns v Daylist.tsx za iskanje razliko v dnevih
// TODO dodaj date-fns v Better.tsx za iskanje razliko v dnevih
// TODO dodaj toaste za api 
// TODO refacotr date. uporabi formating
// TODO primer: ko ni serverja -> prikazi error
// TODO gumb za plna v dayHeader
// TODO plan naj se shrani tudi v bazo za vsak dan
// TODO dodaj plan
// TODO dodaj title nad note oknom, da se ve katera komponenta ga je odprla (datum)
// TODO popravi layout med inputDay in dayList (dayList ozadje konstantno in razmak med komponentoma)
// TODO dodaj oznako ce je note napisan
// TODO fix: ko dodas dan, se mora input dan resetirat
// TODO form style
// TODO spremeni  tile edit gumb => ime = gumb
// TODO reset note, ko shranis dan
// TODO implementiraj note
// TODO dodaj sate za star rating, dodaj v day object
// TODO dodaj starrating
// TODO click izven modala za exit
// TODO dodaj delete day potrditev
// TODO spremeni drop down v dodaj aktivnost oknu
// TODO dodaj delete act potrditev
// TODO spremeni ime AddActForm => CreateUpdateForm
// TODO dodaj delete act v updateAct
// TODO dodaj options gumb v input tile, ki odpre modal za edit/delete tile
// TODO implementiraj edit activity (v modalu)
// TODO addactivity spremenit v modal
// TODO dodaj enote v aktivnosti
// TODO dodaj over/under za aktivnost v addActivity
// TODO ko zbrises aktivnost, naj odstrani tudi isto aktivnost iz dayLista
// TODO dodaj barvo za input type tileov
// TODO implementiraj bravno funkcionalnost za select tile
// TODO preimenuj acctivitySlice -> dayObjectSlice?
// TODO spremeni activity delete gumb v ikono
// TODO edgecase: ni nobene aktivnosti
// TODO scroll to bottom
// TODO scroll day lista
// TODO fix lockin gumb, ne shrani activities v newDay object
// TODO gumb za shranit dan "Lockin"
// TODO API za POST na server
// TODO funkcija za delete day
// TODO zgradi API za server
// TODO gumb za delete day
// TODO zdruzi v localStorage activities in tempInputs
// TODO zgradi day list
// TODO selecetion state v Tile
// TODO ustvari Button component
// TODO implementiraj DATUM v InputDay
// TODO spremeni cached dispatching za input (Blur())
// TODO instaliraj JSON server