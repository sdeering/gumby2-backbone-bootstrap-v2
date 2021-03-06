window.Router = Backbone.Router.extend({

    routes: {
        "": "home",
        "login": "login",
        "register": "register",
        "entry": "entry",
        "testing": "testing"
    },

    cache: {},

    initialize: function () {
        this.cache.container = $("#main");
    },

    home: function () {
        // Since the home view never changes, we instantiate it and render it only once
        if (!this.homeView) {
            this.homeView = new HomeView();
            this.homeView.render();
        } else {
            this.homeView.delegateEvents(); // delegate events when the view is recycled
        }
        this.cache.container.html(this.homeView.el);
        this.initHeader();
        this.initFooter();
    },

    login: function () {
        if (!this.loginView) {
            this.loginView = new LoginView();
            this.loginView.render();
        } else {
            this.loginView.delegateEvents();
        }
        this.cache.container.html(this.loginView.el);
        this.initHeader();
        this.initFooter();
        window.WEBAPP.LOGIN.init();
    },

    register: function () {
        if (!this.registerView) {
            this.registerView = new RegisterView();
            this.registerView.render();
        } else {
            this.registerView.delegateEvents();
        }
        this.cache.container.html(this.registerView.el);
        this.initHeader();
        this.initFooter();
        window.WEBAPP.REGISTER.init();
        window.Gumby.inits.switches(); //activate new modals for view
    },

    entry: function () {
        if (!this.entryView) {
            this.entryView = new EntryView();
            this.entryView.render();
        } else {
            this.entryView.delegateEvents();
        }
        this.cache.container.html(this.entryView.el);
        this.initHeader();
        this.initFooter();
        window.WEBAPP.ENTRY.init();
    },

    testing: function () {
        if (!this.testingView) {
            this.testingView = new TestingView();
            this.testingView.render();
        } else {
            this.testingView.delegateEvents();
        }
        this.cache.container.html(this.testingView.el);
        this.initHeader();
        this.initFooter();
        window.WEBAPP.TESTING.init();
    },

    /* ------------ HELPERS ---------------------------------------------------------- */

    initHeader: function () {
        if (!this.headerView) {
            this.headerView = new HeaderView();
            this.headerView.render();
        } else {
            this.headerView.delegateEvents();
        }
        this.cache.container.prepend(this.headerView.el);
        window.WEBAPP.HEADER.init();
    },

    initFooter: function () {
        if (!this.footerView) {
            this.footerView = new FooterView();
            this.footerView.render();
        } else {
            this.footerView.delegateEvents();
        }
        this.cache.container.append(this.footerView.el);
        window.WEBAPP.FOOTER.init();
        window.Gumby.init(); //fix for checkboxes
        // window.Gumby.inits.switches(); //activate new modals for view
    }

});

/* ------------ LOAD TEMPLATES -------------------------------------------------------- */

templateLoader.load(["HomeView", "LoginView", "RegisterView", "EntryView", "HeaderView", "FooterView", "TestingView"],
    function () {
        app = new Router();
        Backbone.history.start();
    });