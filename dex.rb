# x * y = k
class Dex
  attr_accessor :liquidity, :fee
  def initialize(x, y)
    @liquidity = {}
    @liquidity = {x:x, y:y}
    @fee = 0.0025
  end

  def k(x,y)
    x * y
  end

  def price(input_amount, input_reserve, output_reserve)
    input_amount_minus_fee = input_amount * (1 - fee)
    numerator = k(input_reserve, output_reserve)
    denominator = input_reserve + input_amount_minus_fee
    res = (numerator / denominator).round(2)
    puts "#{res} = #{numerator} / #{denominator}"
    res
  end

  def x_to_y(x)
    before = liquidity.dup
    liquidity[:x]= liquidity[:x] + x
    new_balance = price(x, liquidity[:x] - x, liquidity[:y])
    out = liquidity[:y] - new_balance
    liquidity[:y]= new_balance
    p "#{before} -> IN: #{x} x OUT: #{out} y -> #{liquidity}"
  end

  def y_to_x(y)
    before = liquidity.dup
    liquidity[:y]= liquidity[:y] + y
    new_balance = price(y, liquidity[:y] - y, liquidity[:x])
    out = liquidity[:x] - new_balance
    liquidity[:x]= new_balance
    p "#{before} -> IN: #{y} y OUT: #{out} x -> #{liquidity}"
  end

end

p "ETH TO Baloon"
dex = Dex.new(1000000,1000000)

dex.x_to_y(1000)

p "ETH TO OMG"
dex2 = Dex.new(10,500)
dex2.x_to_y(1)
dex2.y_to_x(50)