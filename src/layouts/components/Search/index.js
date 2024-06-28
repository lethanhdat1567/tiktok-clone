import {
    faCircleXmark,
    faMagnifyingGlass,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeaderlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/layouts/Popper';
import AccountItems from '../AccountItems';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDebounce } from '~/Hook';
import * as searchService from '~/services/searchService';
const cx = classNames.bind(styles);
function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [load, setLoad] = useState(false);
    const InputRef = useRef();
    const debounce = useDebounce(searchValue, 500);
    // useEffect
    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
            return;
        }
        // Call API
        const fetchApi = async () => {
            setLoad(true);
            const result = await searchService.search(debounce);
            setSearchResult(result);
            setLoad(false);
        };
        setLoad(false);
        fetchApi();
    }, [debounce]);
    const handleClear = () => {
        setSearchValue('');
        InputRef.current.focus();
        setSearchResult([]);
    };
    const handleHideResult = () => {
        setShowResult(false);
    };
    const handleChange = (e) => {
        const value = e.target.value;
        if (value.startsWith(' ')) {
            return;
        } else {
            setSearchValue(e.target.value);
        }
    };
    // Return
    return (
        <div>
            <HeaderlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => {
                    return (
                        <PopperWrapper>
                            <div
                                className={cx('search-result')}
                                tabIndex="-1"
                                {...attrs}
                            >
                                <h4 className={cx('search-title')}>Accounts</h4>
                                {searchResult.map((data) => {
                                    return (
                                        <AccountItems
                                            key={data.id}
                                            data={data}
                                        />
                                    );
                                })}
                            </div>
                        </PopperWrapper>
                    );
                }}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={InputRef}
                        value={searchValue}
                        placeholder="Search video and accounts ..."
                        spellCheck={false}
                        onChange={(e) => handleChange(e)}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !load && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {load && (
                        <FontAwesomeIcon
                            className={cx('loading')}
                            icon={faSpinner}
                        />
                    )}
                    <button
                        className={cx('search-btn')}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </HeaderlessTippy>
        </div>
    );
}

export default Search;
