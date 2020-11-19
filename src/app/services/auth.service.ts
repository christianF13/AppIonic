import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public userdata$: Observable<firebase.User>
    constructor(private AFauth: AngularFireAuth, private router: Router, private db: AngularFirestore) {
        this.userdata$ = AFauth.authState; //obtener la data del usuario actual
        this.AFauth.authState.subscribe(user => {
            if (user) {
                console.log(user);
                this.getUser(user.uid).subscribe(u => {
                    localStorage.setItem('user', JSON.stringify(u.payload.data()));
                })
            } else {
                this.router.navigate(['/login']);
            }
        })
    }

    getUser(uid) {
        return this.db.collection('users').doc(uid).snapshotChanges();
    }


    login(email: string, password: string) {

        return new Promise((resolve, rejected) => {
            this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user => {
                resolve(user);
            }).catch(err => rejected(err));
        });
    }

    logout() {
        this.AFauth.auth.signOut().then(() => {
            this.router.navigate(['/login']);
        })
    }

    async register(email: string, password: string, name: string, apellidos: string, cedula: number) {
        try {
            const authRes = await this.AFauth.auth.createUserWithEmailAndPassword(email, password);
            const userDoc = this.db.collection('users').doc(authRes.user.uid);
            const task = await userDoc.set({
                name: name,
                apellidos: apellidos,
                email: email,
                cedula: cedula,
                password: password,
                isAdmin: false,
                uid: authRes.user.uid
            });
            return authRes;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    /**  return new Promise ((resolve, reject) => {
       this.AFauth.auth.createUserWithEmailAndPassword(email, password).then( res =>{
       const uid = res.user.uid;
         this.db.collection('users').doc(uid).set({
         
           name : name,
           apellidos: apellidos,
           email : email,
           cedula: cedula,
           password : password,
           isAdmin: false,
           uid : uid
         })
         resolve(res)
       }).catch( err => reject(err))
     })
     */


    //guardar resultado del test por cada usuario

    async uploadResult(resultado: number, niveles: string, area: string): Promise <boolean> {
try {
        const user = await this.userdata$.pipe(take(1)).toPromise();
        const userDoc = this.db.collection('users').doc(user.uid);

      await userDoc.set({
            resultAl: resultado,
            nivelAl: niveles,
            areaAL: area
        }, { merge: true });
        return true
      } catch (e) {
        console.log(e)
        return false
      }
    }

    // enviar nivel y puntaje de Area comunicacion
    async uploadResultC(resultado: number, niveles: string, area: string) {
        const user = await this.userdata$.pipe(take(1)).toPromise();
        await this.db.collection('users').doc(user.uid).set({
            resultCo: resultado,
            nivelCo: niveles,
            areaCom: area
        }, { merge: true });
    }

    // enviar nivel y puntaje de Acreacion
   async uploadResultCre(resultado: number, niveles: string, area: string) {
      const user = await this.userdata$.pipe(take(1)).toPromise();
          await this.db.collection('users').doc(user.uid).set({
                resultCre: resultado,
                nivelCre: niveles,
                areaCre: area
            }, { merge: true });
       
    }

    // enviar nivel y puntaje de Area seguridad
  async  uploadResultSegu(resultado: number, niveles: string, area: string) {
      const user = await this.userdata$.pipe(take(1)).toPromise();     
          await this.db.collection('users').doc(user.uid).set({
                resultSegu: resultado,
                nivelSegu: niveles,
                areaSe: area
            }, { merge: true });
    }

    // enviar nivel y puntaje de Area resolucion de problemas
  async  uploadResultResol(resultado: number, niveles: string, area: string) {
    const user = await this.userdata$.pipe(take(1)).toPromise();     
          await  this.db.collection('users').doc(user.uid).set({
                resultResol: resultado,
                nivelResol: niveles,
                areaResul: area
            }, { merge: true });
    }

 async   uploadPromedio(prome: number, ngeneral: string) {
  const user = await this.userdata$.pipe(take(1)).toPromise(); 
        await    this.db.collection('users').doc(user.uid).set({
                promedio: prome,
                nivelGe: ngeneral
            }, { merge: true });
    }
}