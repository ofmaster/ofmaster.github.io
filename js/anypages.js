const DELAY = 500;

$(document).ready(function() {

	new WOW().init();
	

	
	
	$('.about_us').click(function(){
		var id  = $(this).attr('id');
		var position =$(id).offset().top;
		$('html,body').animate({scrollTop: position}, 700);
	})

	$(document).on('click', '.navbar-hide div', function () {
		window.location= $(this).attr('id');

	});

	$('.logo').click(function(){
		window.location= $(this).attr('id');
	})

	
	$(".navbar-hide").hide();
	$("#service").click(function() {
		$(".navbar-hide").slideToggle();
	})



	$(':checkbox').click(function(){
		//alert($(this).siblings('span').text());
		
		let price=$(this).parent('.div_amount').siblings('.pos_price').children('span').text();
		//alert(price);
		//alert($(this).prop("checked"));
		if($(this).prop("checked")){
			$(this).parent('.div_amount').siblings('.rslt').html('<span>'+price+'</span>руб');	
			//summ=summ+Number.parseInt(price);
		}else{
			$(this).parent('.div_amount').siblings('.rslt').html('');
		}
		showOrder();
	})

	$(':text').bind("keyup input click", function() {
		this.value = this.value.replace(/[^0-9]/g, '');
		if($(this).val().length){
			let price=$(this).parent('.div_amount').siblings('.pos_price').children('span').text()*$(this).val();
			$(this).parent('.div_amount').siblings('.rslt').html('<span>'+price+'</span>руб');	
		}else{
			let r=$(this).parent('.div_amount').siblings('.rslt').children('span').text();
			$(this).parent('.div_amount').siblings('.rslt').html('');
		}
		showOrder();
		
	})


//показывает блок оплаты если что то выбрано для заказа
function showOrder(){
	let order=0;
	$('.rslt span').each(function(index,val){
		order+=Number.parseInt($(val).text()); 
		$('#final_rate').html('Ваш заказ : <span>'+order+'</span> рублей');
	});
	if(order){
		$('.order').css('display', 'block');
	}else{
		$('.order').css('display', 'none');
	}
}

$('#order').click(function(){
	let final_rate=$('#final_rate span').text();
	ipayCheckout({
		amount:final_rate,
		currency:'RUB',
		order_number:'',
		description: 'Сумма вашего заказа'},
		function(order) { showSuccessfulPurchase(order) },
		function(order) { showFailurefulPurchase(order) })});

});
