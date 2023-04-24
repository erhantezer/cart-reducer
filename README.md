# CART

## App.jsx
```js
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Home/>
    </>
  )
}

export default App;
```

## Home:jsx
```js
import Navbar from '../components/Navbar';
import CarContainer from '../components/cart/CarContainer';
import { useGlobalContext } from '../context';

const Home = () => {
    const { loading } = useGlobalContext();

    return (
        <>
            {loading ?
                (<div className='loading' >
                    <h1>Loading...</h1>
                </div >) : (
                    <main>
                        <Navbar />
                        <CarContainer />
                    </main>
                )
            }
        </>
    )
}

export default Home;
```

##
```js

```

##
```js

```

##
```js

```

##
```js

```

##
```js

```
