pragma solidity ^0.4.4;

contract Consignment {
  struct Package {
    uint price ;
    address seller ;
    address buyer ;


  }
  Package public package;
  uint  public  funds ;


  modifier onlyBuyer() {
    require(msg.sender == package.buyer);
    _;
  }

  modifier onlySeller() {
    require(msg.sender == package.seller);
    _;
  }


  event Aborted();
  event OnPurchase();
  event OnItemReceived();



  function Consignment(){

    package.seller = msg.sender;


  }

  function setPrice(uint price) onlySeller {
    package.price = price;
  }

  function purchase() payable
  {
    if( msg.value >= package.price){
      package.buyer = msg.sender;
      funds =  msg.value;
      OnPurchase();
    }

  }
  function getFunds() returns (uint outfunds) {
     return funds;
  }


  function confirmReceived()
  {

    OnItemReceived();
    package.seller.transfer(funds);
    funds = 0;



  }
  function abort() onlySeller
  {
    Aborted();
    package.seller.transfer(funds);
    funds = 0;
  }


}
