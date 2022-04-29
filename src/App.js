import { useState } from 'react';
function Header(props) {
  return (
    <header>
      <h1>
        <a
          href='/'
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>
        <div>{props.testWithoutBuild}</div>
      </h1>
    </header>
  );
}
// function Nav(props) {k
//   const lis = [];
//   for (let i = 0; i < props.topics.length; i++) {
//     let t = props.topics[i];
//     lis.push(
//       <li key={t.id}>
//         <a
//           id={t.id}
//           href={`/read/${t.id}`}
//           onClick={(event) => {
//             event.preventDefault();
//             props.onChangeMode(event.target.id);
//           }}
//         >
//           {t.title}
//         </a>
//       </li>
//     );
//   }
//   return (
//     <nav>
//       <ol>{lis}</ol>
//     </nav>
//   );
// }
const Nav = ({ topics, onChangeMode }) => {
  return (
    <nav>
      <ol>
        {topics.map(
          (
            topic // #id3
          ) => (
            <li key={topic.id}>
              <a
                id={topic.id} // #id4 #id6
                href={`/read/${topic.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onChangeMode(Number(e.target.id)); // #id5 #id7
                }}
              >
                {topic.title}
              </a>
            </li>
          )
        )}
      </ol>
    </nav>
  );
};

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}
function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onCreate(title, body);
        }}
      >
        <p>
          <input type='text' name='title' placeholder='title' />
        </p>
        <p>
          <textarea name='body' placeholder='body'></textarea>
        </p>
        <p>
          <input type='submit' value='Create' />
        </p>
      </form>
    </article>
  );
}
function Update(props) {
  const [title, setTitle] = useState(props.title); //#title3-u #title6-u
  const [body, setBody] = useState(props.body);
  return (
    <article>
      <h2>Update</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const title = e.target.title.value; // *value of input ** GET results of input.value #title7-u
          const body = e.target.body.value; // *value of textarea ** GET results of textarea.value
          props.onUpdate(title, body); // #title8-u *send it to mode==='UPDATE' & content= <Update onUpdate></Update>
        }}
      >
        <p>
          <input
            type='text'
            name='title'
            placeholder='title'
            value={title} // #title4-u First {title} is props.title from [title] of useState
            onChange={(e) => {
              setTitle(e.target.value); // #title5-u
            }}
          />
        </p>
        <p>
          <textarea
            name='body'
            placeholder='body'
            value={body} // First {body} is props.body from [body] of useState
            onChange={(e) => {
              setBody(e.target.value);
            }}
          ></textarea>
        </p>
        <p>
          <input type='submit' value='Update' />
        </p>
      </form>
    </article>
  );
}

function App() {
  // const _mode = useState('WELCOME');
  // const mode = _mode[0];
  // const setMode = _mode[1];
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null); //#id1 #id10 set
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'javascript', body: 'javascript is ...' },
  ]);
  let content = null;
  let contextControl = null;
  if (mode === 'WELCOME') {
    content = <Article title='Welcome' body='Hello, WEB'></Article>;
  } else if (mode === 'READ') {
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        // id from #id10
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>;
    contextControl = (
      <>
        <li>
          <a
            href={`/update/${id}`}
            onClick={(e) => {
              e.preventDefault();
              setMode('UPDATE');
            }}
          >
            Update
          </a>
        </li>
        <input
          type='button'
          value='Delete'
          onClick={() => {
            const newTopics = [];
            for (let i = 0; i < topics.length; i++) {
              if (topics[i].id !== id) {
                newTopics.push(topics[i]);
              }
            }
            setTopics(newTopics);
            setMode('WELCOME');
          }}
        />
      </>
    );
  } else if (mode === 'CREATE') {
    content = (
      <Create
        onCreate={(_title, _body) => {
          const newTopic = { id: nextId, title: _title, body: _body };
          const newTopics = [...topics];
          newTopics.push(newTopic);
          setTopics(newTopics);
          setMode('READ');
          setId(nextId);
          setNextId(nextId + 1);
        }}
      ></Create>
    );
  } else if (mode === 'UPDATE') {
    let title, // *find out the proper title&body FROM HERE
      body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        //~#id11-u
        title = topics[i].title; // #title1-u * -> content<Update title={title}/>
        body = topics[i].body; //* -> content<Update body={body}/>
      }
    } // *TO HERE
    content = (
      <Update
        title={title} // #title2-u* {title} is right up line code
        body={body} // * {body} is right up line code
        onUpdate={(title, body) => {
          // #title9-u
          console.log(title, body);
          const newTopics = [...topics];
          const updatedTopic = { id: id, title: title, body: body }; // #title10-u *Input (#title9-u) to updatedTopic
          // *id from mode === 'READ'
          for (let i = 0; i < newTopics.length; i++) {
            if (newTopics[i].id === id) {
              //*== If we choose the id  (In array / What we choose)
              newTopics[i] = updatedTopic; //#title11-u
              break;
            }
          }
          setTopics(newTopics); //~#title12-u
          setMode('READ');
        }}
      ></Update>
    );
  }
  return (
    <div>
      <Header
        title='WEB'
        onChangeMode={() => {
          setMode('WELCOME');
        }}
        testWithoutBuild='This will be shown only in src, not in a build folder'
      ></Header>
      <Nav
        topics={topics} //#id2
        onChangeMode={(_id) => {
          // #id8
          setMode('READ');
          setId(_id); // #id9
        }}
      ></Nav>
      {content}

      <ul>
        <li>
          <a
            href='/create'
            onClick={(e) => {
              e.preventDefault();
              setMode('CREATE');
            }}
          >
            Create
          </a>
        </li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
