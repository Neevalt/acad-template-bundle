Bundle de templating de l'académie de Créteil
=============================================

Installer le bundle
-------------------

Depuis la console : 

```sh
composer require neevalt/acad-template-bundle
```

Importer les routes
-------------------

Grâce à Symfony Flex, le bundle est activé automatiquement. Pour bénéficier des routes, il faut importer celles-ci
dans `config/routes.yaml` :

```yaml
acad_template:
    resource: '@AcadTemplateBundle/Resources/config/routing.yaml'
```

Utiliser et configurer le template
----------------------------------

### Utiliser le template

Pour utiliser ce template, il est vivement conseillé de gérer les dépendances via 
[Webpack Encore](https://symfony.com/doc/current/frontend/encore/installation.html).
Vous bénéficierez ainsi d'une personnalisation plus avancée.

Installez celles-ci :

```sh
yarn add jquery popper.js bootstrap
```

Puis créez vos assets, par exemple comme suit :

```
projet/
└── assets/
    ├── scss
    │   ├── _variables.scss
    │   └── app.scss
    └── js
        └── app.js
```
**Nb : le fichier `_variables.scss` n'est nécessaire que si vous souhaitez modifier les différentes variables Sass du
template (les couleurs, les tailles, ...)**

Faites les imports nécessaires :
```scss
// app.scss
@import './variables';
@import '~bootstrap/scss/bootstrap';
@import '../../vendor/neevalt/acad-template-bundle/Resources/assets/scss/acad-template.scss';
```

```js
// app.js
import '../../vendor/neevalt/acad-template-bundle/Resources/assets/js/acad-template.js';
```

Compilez vos assets via webpack :

```js
// webpack.config.js
Encore
    // ...
  .addEntry('js/app', './assets/js/app.js')
  .addStyleEntry('css/app', './assets/css/app.scss')
  .enableSassLoader()
  .autoProvidejQuery()
    // ...
```

**Même si la configuration ci-dessus fonctionne, il est plutôt conseillé d'utiliser des chunks partagés pour
profiter du cache navigateur :**

```js
// webpack.config.js
Encore
    //...
    .createSharedEntry('vendor', [
        'babel-polyfill', // Pour es2017
        'bootstrap',
        'bootstrap/scss/bootstrap.scss',
        './vendor/neevalt/acad-template-bundle/Resources/assets/js/acad-template',
        './vendor/neevalt/acad-template-bundle/Resources/assets/scss/acad-template.scss',
    ])
    //...
```

Enfin, étendez le template du bundle dans le votre :

```twig
{% extends '@AcadTemplate/base.html.twig' %}

{% block header_assets %}
    {# Si vous utilisez les chunks partagés, décommentez les trois lignes suivantes #}
    {#<link rel="stylesheet" href="{{ asset('build/vendor.css') }}" />#}
    {#<script src="{{ asset('build/manifest.js') }}"></script>#}
    {#<script src="{{ asset('build/vendor.js') }}"></script>#}
    <link rel="stylesheet" href="{{ asset('build/css/app.css') }}" />
{% endblock %}

{% block footer_assets %}
    <script src="{{ asset('build/js/app.js') }}"></script>
{% endblock %}
```

Pour un exemple fonctionnel : 

```twig
{% extends '@AcadTemplate/base.html.twig' %}

{% set title = "Mon appli" %}
{% set logout_link = path("arena_auth_logout") %}

{% block header_assets %}
    <link href="{{ asset('build/css/app.css') }}" rel="stylesheet">
{% endblock %}

{% block navbar_content %}
    <li class="nav-item active">
        <a class="nav-link" href="#">
            Home
        </a>
    </li>
    <li class="nav-item dropdown">
        <button class="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown
        </button>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
        </div>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
    </li>
    <li class="nav-item disabled">
        <span>Disabled</span>
    </li>
{% endblock %}

{% block sidebar_content %}
    <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link" href="#">
                Un autre lien
            </a>
        </li>
    </ul>
{% endblock %}

{% block navbar_right_dropdown %}
    <a class="dropdown-item" href="#">Guide utilisateur</a>
    <div class="dropdown-divider"></div>
    {{ parent() }}
{% endblock %}

{% block main %}
    <div class="container">
        <h1 style="text-align: center">Ma page</h1>
        <p>
            Metuentes igitur idem latrones Lycaoniam magna parte campestrem cum se inpares nostris fore congressione
            stataria documentis frequentibus scirent, tramitibus deviis petivere Pamphyliam diu quidem intactam sed
            timore populationum et caedium, milite per omnia diffuso propinqua, magnis undique praesidiis conmunitam.
            Latius iam disseminata licentia onerosus bonis omnibus Caesar nullum post haec adhibens modum orientis
            latera cuncta vexabat nec honoratis parcens nec urbium primatibus nec plebeiis.
        </p>
        <p>
            Cyprum itidem insulam procul a continenti discretam et portuosam inter municipia crebra urbes duae faciunt
            claram Salamis et Paphus, altera Iovis delubris altera Veneris templo insignis. tanta autem tamque
            multiplici fertilitate abundat rerum omnium eadem Cyprus ut nullius externi indigens adminiculi indigenis
            viribus a fundamento ipso carinae ad supremos usque carbasos aedificet onerariam navem omnibusque armamentis
            instructam mari committat.
        </p>
        <p>
            Intellectum est enim mihi quidem in multis, et maxime in me ipso, sed paulo ante in omnibus, cum M.
            Marcellum senatui reique publicae concessisti, commemoratis praesertim offensionibus, te auctoritatem huius
            ordinis dignitatemque rei publicae tuis vel doloribus vel suspicionibus anteferre. Ille quidem fructum omnis
            ante actae vitae hodierno die maximum cepit, cum summo consensu senatus, tum iudicio tuo gravissimo et
            maximo. Ex quo profecto intellegis quanta in dato beneficio sit laus, cum in accepto sit tanta gloria.
            Paphius quin etiam et Cornelius senatores, ambo venenorum artibus pravis se polluisse confessi, eodem
            pronuntiante Maximino sunt interfecti. pari sorte etiam procurator monetae extinctus est. Sericum enim et
            Asbolium supra dictos, quoniam cum hortaretur passim nominare, quos vellent, adiecta religione firmarat,
            nullum igni vel ferro se puniri iussurum, plumbi validis ictibus interemit. et post hoe flammis Campensem
            aruspicem dedit, in negotio eius nullo sacramento constrictus.
        </p>
    </div>
{% endblock %}

{% block footer_assets %}
    <script src="{{ asset('build/js/app.js') }}"></script>
{% endblock %}
```

**Important : Certains éléments (comme les modals Bootstap) nécessitent d'être en dehors du contexte
donné par le template. Un block `after_page` est défini à cet effet.**

### Configurer le template

#### Variables twig

La configuration du template se fait directement dans le votre via des variables twig.
Les valeurs par défaut sont :

```twig
{# Le titre de l'onglet #}
{% set title = 'Titre' %}

{# Le chemin du favicon #}
{% set favicon = favicon|default('bundles/acadtemplate/images/en.ico') %}

{# Le titre dans la navbar #}
{% set navbar_title = title %}

{# Le titre dans la sidebar #}
{% set sidebar_title = title %}

{# Le label du dropdown fixé à droite #}
{% set navbar_right_label = 'Menu' %}

{# Le breakpoint Bootstrap auquel la navbar est réduite #}
{% set navbar_bp = 'md' %}

{# Le breakpoint Bootstrap auquel la sidebar est cachée #}
{# Ce paramètre est ignoré si sidebar_display vaut 'collapse' #}
{% set sidebar_bp = 'xl' %}

{# Le type de sidebar. Valeurs possibles : null, 'collapse', 'always' #}
{# Si la valeur est à 'collapse', son contenu sera remplacé par celui de la navbar #}
{% set sidebar_display = 'always' %}

{# Le chemin du logo dans la navbar #}
{% set logo_navbar = 'bundles/acadtemplate/images/logo_ac_blanc.png) %}

{# Le chemin du logo dans la sidebar #}
{% set logo_sidebar = 'bundles/acadtemplate/images/logo_ac_blanc.png' %}

{# Le chemin du logo dans le footer #}
{% set logo_footer = 'bundles/acadtemplate/images/logo_dsi.png' %}

{# La disposition du footer. Valeurs possibles : null, 'sticky', 'always' #}
{% set footer_display = 'sticky' %}

{# La largeur du footer. Valeurs possibles : null, 'full' #}
{# Cette variable n'est utile que si footer_display vaut 'always' #}
{% set footer_width = null %}

{# L'url de déconnexion #}
{% set logout_link = '#' %}

{# Le numéro CNIL #}
{% set num_cnil = null %}

{# Le style Bootstrap de la navbar. Valeurs possibles: 'light', 'dark' #}
{# Cela ne change que l'apparence du bouton de collapse de la navbar #}
{% set navbar_style = 'dark' %}

{# Les classes associées aux toasts #}
{% set toasts_class = 'col-xs-12 col-sm-6 col-md-4 col-xl-3' %}

{# Le chemin vers la page "Mention légales" #}
{% set path_mentions_legales = path("acad_template_mentions_legales") %}
```

#### Apparence

Si vous souhaitez modifier l'apparence du template, comme les couleurs, les hauteurs des footer / navbar, etc...,
des variables Sass sont disponibles. Les valeurs par défaut sont :

```scss
$acad-navbar-height: 60px;
$acad-navbar-header-width: 250px;
$acad-navbar-background: #3F51B5;
$acad-navbar-header-background: $acad-navbar-background;
$acad-navbar-color: #FFF;
$acad-navbar-hover: #FF8F00;
$acad-navbar-header-border-right: none;
$acad-sidebar-width: $acad-navbar-header-width;
$acad-footer-height: 60px;

$acad-navbar-accent: #1A237E;
$acad-footer-background: transparent;
$acad-footer-color: inherit;

$acad-sidebar-background: #536DFE;
$acad-sidebar-color: $acad-navbar-color;
$acad-sidebar-accent:  $acad-navbar-background;
$acad-sidebar-hover: $acad-navbar-hover;
$acad-sidebar-font-size: 15px;
$acad-sidebar-margin: 8px 8px 8px 25px;
$acad-sidebar-border-right: $acad-navbar-header-border-right;
$acad-sidebar-logo-height: 100px;
```

Pour les modifier, il suffit de les réécrire dans le fichier `_variables.scss` mentionné plus haut.
Il est aussi possible de redéfinir les breakpoints Bootstrap : 

```scss
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1300px
);
```

**Si vous changez ces valeurs et que vous avez utilisé les chunks partagés, pensez à en créer un qui ne servira qu'à
redéfinir ces variables avec les imports nécessaires (qui ne doivent donc plus constituer des chunks).**

#### Redéfinir le template

Pour redéfinir le template, consultez la
[documentation officielle](http://symfony.com/doc/current/templating/overriding.html).

#### Les toasts

Le template vient avec des messages toasts javascript qui affichent par défaut les flash messages de Symfony :

```php
public function home()
{
    $this->addFlash("success", "#Succès#Le projet a bien été créé");
    return $this->render('base.html.twig');
}
```

Il est aussi possible de les générer soi-même avec du js, cela peut être utile notamment pour de l'ajax.
Dans `app.js` :

```js
import acadAlert from '../../vendor/neevalt/acad-template-bundle/Resources/assets/js/alert';

acadAlert('info','Une information');

async function doAjax(args) {
    let type;
    let message;
    try {
        message = await $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: args
        });
        type = 'success';
    } catch (error) {
        message = '#Erreur#Une erreur est survenue';
        type = 'danger';
    }
    acadAlert(type, message);
}
```

Le premier argument de la fonction `acadAlert(type, message)` détermine la couleur du toast.
Les couleurs sont [celles de Bootstrap](https://getbootstrap.com/docs/4.0/utilities/colors/).

Pour ajouter un titre au toast, respecter la syntaxe de message suivante : `#Titre#Le message`.

Rendu
-----

L'ensemble des extraits de code montrés ci-dessus donne le rendu suivant :

![Rendu template](https://puu.sh/zSwdx/0165ac9941.gif)

Utilisation sans Webpack
------------------------

Il est déconseillé de se passer de Webpack pour utiliser ce bundle. Si vous décidez néanmoins de le faire, il suffit de
ne pas écraser les blocks assets du template : 

```twig
{% extends '@AcadTemplate/base.html.twig' %}

{% block header_assets %}
    {{ parent() }}
     {# Mon css custom #}
{% endblock %}

{% block footer_assets %}
    {{ parent() }}
     {# Mon js custom #}
{% endblock %}
```