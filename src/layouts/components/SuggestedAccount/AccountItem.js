import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SuggestedAccount.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/imgs';
import { faCheckCircle, faHandLizard } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/layouts/Popper';

const cx = classNames.bind(styles);
function AccountItem() {
    const handlePreview = (props) => {
        return (
            <div tabIndex="-1" {...props} placement="bottom">
                <PopperWrapper>
                    <div className={cx('preview')}></div>
                </PopperWrapper>
            </div>
        );
    };
    return (
        <div>
            <Tippy interactive delay={[800, 0]} render={handlePreview}>
                <div className={cx('account-item')}>
                    <img
                        className={cx('account-img')}
                        src={images.avatar}
                        alt=""
                    />
                    <div className={cx('account-info')}>
                        <p className={cx('nickname')}>
                            <strong>lethanhdat</strong>
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </p>
                        <p className={cx('name')}>Le Thanh Dat</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

export default AccountItem;
