$(() =>  {
    // お客様の声
    const $items = $('.reviews__item');
    const $reviewsDots = $('.reviews__dot');
    const $dotsContainer = $('.reviews__dots');
    let current = 0;
    $('.reviews__items').slick({
        slidesToShow: 1,
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        prevArrow: '<img class="slick-prev reviews__arrow--left" src="assets/image/arrow_left_circle_fill_sp.svg">',
        nextArrow: '<img class="slick-next reviews__arrow--right" src="assets/image/arrow_right_circle_fill_sp.svg">',
        // ★ ページドットをカスタマイズ
        customPaging: function (slider, i) {
            return '<span class="reviews__dot"></span>';
        },
        responsive: [
            {
                breakpoint: 768, // 768px 未満（スマホ）
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 9999, // 768px以上（PC側）を捕まえる
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            }
        ]
    });
    function showItem(index, items) {
        items.removeClass('reviews__is-active');
        items.eq(index).addClass('reviews__is-active');
    }
    $('.reviews__arrow--right').on('click', function () {
        current = (current + 1) % $items.length;
        showItem(current, $items);
        showItem(current, $reviewsDots);
    });
    $('.reviews__arrow--left').on('click', function () {
        current = (current - 1 + $items.length) % $items.length;
        showItem(current, $items);
        showItem(current, $reviewsDots);
    });
    $dotsContainer.on('click', '.reviews__dot', function() {
        const index = $(this).index();
        showItem(index, $reviewsDots);
        showItem(index, $items);
    });

    // よくあるご質問
    $('.faq__accordion-trigger').each(function() {
        $(this).on('click', function() {
            const $button = $(this);
            const $content = $button.next();
            const isExpanded = $button.attr('aria-expanded') === 'true';
            $button.attr('aria-expanded', !isExpanded);
            $content.toggleClass('open');
        });
    });

    // TOPへ戻るボタン
    const $btn = $('.to-top');
    const $footer = $('.footer');
    const mvHeight = $('.mv').outerHeight();
    $(window).on('scroll', function () {
        const scrollTop = $(window).scrollTop();
        const winHeight = $(window).height();
        const footerTop = $footer.offset().top;
        const btnHeight = $btn.outerHeight();
        const overlap = (scrollTop + winHeight) - footerTop;
        // 表示・非表示の切り替え
        if (scrollTop > mvHeight) {
            $btn.addClass('show');
        } else {
            $btn.removeClass('show');
        }
        // フッターに重ならないよう調整
        if (overlap > 0) {
            $btn.css('bottom', `${40 + overlap}px`);
        } else {
            $btn.css('bottom', '40px');
        }
    });
	$(function () {
		const $pagetopBtn = $('.pagetop');
		// .pagetop をクリックしたらページトップへスムーススクロール
		$pagetopBtn.on('click', function () {
			window.scroll({
				top: 0,
				behavior: 'smooth'
			});
		});
		// スクロールイベントでボタンの表示・非表示切り替え
		$(window).on('scroll', function () {
			if ($(this).scrollTop() > 280) {
				$pagetopBtn.css('opacity', '1');
			} else {
				$pagetopBtn.css('opacity', '0');
			}
		});
	});
});