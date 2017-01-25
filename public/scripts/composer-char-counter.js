$(document).ready(function() {
	$('.new-tweet').find('textarea').on('keyup',function(){
		const inputLimit = 140;
		const inputRemain = inputLimit - $(this).val().length;
		const counter = $(this).closest('form').find('.counter');
		if (inputRemain < 0) {
			counter.addClass('red-text');
		} else {
			counter.removeClass('red-text');
		}
		counter.text(inputRemain);
		console.log($(document.body));
	});
});