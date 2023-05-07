// 컴포넌트, 라우터(페이지), 스토어(데이터통신)

//Component
export class Component {
  constructor(payload = {}) {
    const { tagName = "div", state = {}, props = {} } = payload;
    this.el = document.createElement(tagName);
    this.state = state;
    this.props = props;
    this.render();
  }
  render() {}
}

//Router
function routeRender(routes) {
  if (!location.hash) {
    history.replaceState(null, "", "/#/");
  }

  const routerView = document.querySelector("router-view");
  //해당 부분은 배열 구조분해 할당 받는다. 기능 이름을 지정하여 0번째는 hash, 1번째는 queryString로 만든다.
  //location 로컬 주소 부분이다.
  //hash는 예로 '#/about' #기준으로 hash다.
  //split('?') ?표를 기준으로 배열 데이터를 만들어 나눈다.
  const [hash, queryString = ""] = location.hash.split("?");

  const query = queryString.split("&").reduce((acc, cur) => {
    const [key, value] = cur.split("=");
    acc[key] = value;
    return acc;
  }, {});

  history.replaceState(query, "");

  const currentRoute = routes.find((route) =>
    new RegExp(`${route.path}/?$`).test(hash)
  );
  routerView.innerHTML = "";
  routerView.append(new currentRoute.component().el);

  window.scrollTo(0, 0);
}

export function createRouter(routes) {
  return function () {
    window.addEventListener("popstate", () => {
      routeRender(routes);
    });
    routeRender(routes);
  };
}

//Store
export class Store {
  constructor(state) {
    this.state = {};
    this.observers = {};
    for (const key in state) {
      Object.defineProperty(this.state, key, {
        get: () => state[key],
        set: (val) => {
          state[key] = val;
          if (Array.isArray(this.observers[key])) {
            this.observers[key].forEach(observer => observer(val))
          }
        },
      });
    }
  }
  subscribe(key, cb) {
    Array.isArray(this.observers[key])
    ? this.observers[key].push(cb)
    : this.observers[key] = [cb]
  }
}
