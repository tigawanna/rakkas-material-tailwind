# RAKKAS + TAILWIND
Rakkas js starter template 

Packages 
- materilal-tailwind
- tanstack/react-query
- pocketbase + [typed-pocketbase](https://github.com/david-plugge/typed-pocketbase)
 To generate type , 
 run the command inside the pocketbase directory (same directory in which you run `./pocketbase serve` )
 ```sh
 npx typed-pocketbase --email ypurtypegen@email.com --password your_typegen_pasorword -o Database.d.ts
 ```
 then copy the Database.d.ts
- @tanem/react-nprogress : for nprogress bar on route change

