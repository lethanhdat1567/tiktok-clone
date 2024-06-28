import styles from './SuggestedAccount.module.scss';
import classNames from 'classnames/bind';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);
function SuggestedAccount({ label }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('heading')}>{label}</p>
            <AccountItem />
            <AccountItem />
            <AccountItem />
            <AccountItem />
            <AccountItem />
            <AccountItem />
            <AccountItem />
            <p className={cx('more-btn')}>See All</p>
        </div>
    );
}

export default SuggestedAccount;
