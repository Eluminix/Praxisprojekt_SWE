# Praxisprojekt_SWE
Adv. SWE 5. + 6. Semester  

Package Versionen
---------------------------------------------------------
Angular CLI: 15.2.4  
Node: 18.14.1  
Package Manager: npm 9.3.1   

Angular: 15.2.5  
... animations, cdk, common, compiler, compiler-cli, core, forms  
... material, platform-browser, platform-browser-dynamic, router  
... service-worker  

@angular-devkit/architect       0.1502.4  
@angular-devkit/build-angular   15.2.4  
@angular-devkit/core            15.2.4  
@angular-devkit/schematics      15.2.4  
@angular/cli                    15.2.4  
@schematics/angular             15.2.4  
rxjs                            7.8.0  
typescript                      4.9.5  


Anleitung
---------------------------------------------------------
Server für Json Dateien:  
npm install express cors --save  

In Verzeichnis server navigieren und den Server starten:  
node server.js  
Server läuft unter Port 3000  

In Verzeichnis src/app navigieren und Anwendung starten:  
ng serve  
Server läuft unter Port 4200  


Tests:  
ng test  

Code Coverage:  
ng test --no-watch --code-coverage  
erstellt den Ordner coverage mit einer index.html mit der code coverage

