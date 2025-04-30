# MindSpeak - Site Web Promotionnel

Ce dépôt contient le code source du site web promotionnel de MindSpeak, une application mobile dédiée à l'expression des émotions pour les personnes atteintes de Trouble du Spectre Autistique (TEA/TSA).

## Structure du Projet

Le site est structuré de la manière suivante :

```
mindspeak-website/
│
├── index.html                  # Page d'accueil (Catalan)
├── funcionament.html           # Page "Comment ça marche" (Catalan)
├── negoci.html                 # Page "Modèle économique" (Catalan)
├── media.html                  # Page "Média" (Catalan)
├── equip.html                  # Page "Équipe" (Catalan)
├── contacte.html               # Page "Contact" (Catalan)
│
├── es/                         # Version espagnole
│   ├── index.html
│   ├── funcionamiento.html
│   ├── negocio.html
│   ├── media.html
│   ├── equipo.html
│   └── contacto.html
│
├── en/                         # Version anglaise
│   ├── index.html
│   ├── how-it-works.html
│   ├── business.html
│   ├── media.html
│   ├── team.html
│   └── contact.html
│
├── css/
│   ├── styles.css              # Styles communs
│   ├── home.css                # Styles spécifiques à la page d'accueil
│   ├── functionality.css       # Styles pour "Comment ça marche"
│   ├── business.css            # Styles pour "Modèle économique"
│   ├── media.css               # Styles pour "Média"
│   ├── team.css                # Styles pour "Équipe"
│   └── contact.css             # Styles pour "Contact"
│
├── js/
│   ├── main.js                 # Scripts communs
│   ├── functionality.js        # Scripts pour "Comment ça marche"
│   ├── business.js             # Scripts pour "Modèle économique"
│   ├── media.js                # Scripts pour "Média"
│   ├── team.js                 # Scripts pour "Équipe"
│   └── contact.js              # Scripts pour "Contact"
│
├── images/                     # Images et ressources graphiques
│   ├── mindspeak-logo.png
│   ├── mindspeak-logo-white.png
│   ├── hero-illustration.png
│   ├── app-screens.png
│   ├── team/
│   ├── screens/
│   └── ...
│
└── downloads/                  # Fichiers téléchargeables
    ├── mindspeak-prototype.apk
    ├── press-kit/
    └── ...
```

## Fonctionnalités du Site

- **Design Responsive**: Adapté à tous les appareils (mobile, tablette, desktop)
- **Multilingue**: Disponible en Catalan, Espagnol et Anglais
- **Accessibilité**: Conforme aux normes WCAG 2.1 niveau AA
- **Animations**: Animations fluides et légères pour améliorer l'expérience utilisateur
- **Formulaire de Contact**: Validation côté client et préparation pour traitement côté serveur
- **Galerie Média**: Affichage des captures d'écran avec effet lightbox
- **Lecteur Vidéo**: Options de prévisualisation rapide

## Technologies Utilisées

- **HTML5**: Structure sémantique
- **CSS3**: Styles modernes avec flexbox et grid
- **JavaScript**: Vanilla JS pour les interactions et animations
- **Font Awesome**: Pour les icônes
- **Google Fonts**: Pour la typographie (Montserrat et Open Sans)

## Recommandations de Déploiement

1. Héberger sur un serveur web standard (Apache, Nginx, etc.)
2. Implémenter le protocole HTTPS pour la sécurité
3. Configurer la compression gzip pour améliorer les performances
4. Mettre en place un cache navigateur approprié

## Maintenance et Mises à Jour

Pour mettre à jour le site:
1. Modifier les fichiers HTML, CSS ou JS pertinents
2. Tester sur différents appareils et navigateurs
3. Mettre à jour les versions linguistiques correspondantes

## Crédits

- Conçu et développé par: Équipe MindSpeak
  - Damià Vidal Uribe (Project Manager)
  - Hicham Oukassou (Database Manager)
  - Nizar Ahannach Ahannach (Design Manager)
  - Alex Martinez Sicilia (Commercial, Documentation Manager)

## Contact

Pour toute question concernant ce site web, veuillez contacter:
- info@mindspeak-app.com

---

© 2025 MindSpeak. Tous droits réservés.