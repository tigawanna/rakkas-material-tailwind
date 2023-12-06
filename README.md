# RAKKAS + TAILWIND
Rakkas js starter template 
Packages 

- tailwind+shadcn+daisyui for styling
    shadch add commands will work and put the components in scr/compnents/shadcn/ui
    buy default this tempalte comes with
    - button
    - dialog    
    - alert-dialog  
    - avatar        
    - card     
    - dropdown-menu  
    - popover      
    - input 
    - textarea
    - label          
    - checkbox 
    - select       
               

- tanstack/react-query for data fetching
- @tanem/react-nprogress : for nprogress bar on route change
- pocketbase + [typed-pocketbase](https://github.com/david-plugge/typed-pocketbase)
 To generate type , 
 run the command inside the pocketbase directory (same directory in which you run `./pocketbase serve` )
 ```sh
 npx typed-pocketbase --email ypurtypegen@email.com --password your_typegen_pasorword -o Database.d.ts
 ```
 then copy the Database.d.ts

