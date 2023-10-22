import HTMLFlipBook from 'react-pageflip';

function MyBook(props) {
    return (
        <HTMLFlipBook width={300} height={500}>
            <div className="demoPage1">Page 1</div>
            <div className="demoPage2">Page 2</div>
            <div className="demoPage">Page 3</div>
            <div className="demoPage">Page 4</div>
        </HTMLFlipBook>
    );
}

export default MyBook;